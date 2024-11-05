package com.salon.controller;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salon.entities.User;
import com.salon.exceptions.ApiException;
import com.salon.payloads.AuthRequest;
import com.salon.payloads.AuthResponse;
import com.salon.payloads.UserDto;
import com.salon.repositories.UserRepo;
import com.salon.security.JwtTokenHelper;
import com.salon.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	UserRepo userRepo;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/login")
	public ResponseEntity<?> createToken(@RequestBody AuthRequest request) throws Exception {
		this.authenticate(request.getUsername(), request.getPassword());
		User userDetails = (User) this.userDetailsService.loadUserByUsername(request.getUsername());
		String token = this.jwtTokenHelper.generateToken(userDetails);
		System.out.println(this.jwtTokenHelper.extractAllClaims(token));
		UserDto user = this.userToDto(userDetails);

		return ResponseEntity.ok(new AuthResponse(token, user));

	}

	private void authenticate(String username, String password) throws Exception {

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);

		try {

			this.authenticationManager.authenticate(authenticationToken);

		} catch (BadCredentialsException e) {
			System.out.println("Invalid Detials !!");
			throw new ApiException("Invalid username or password !!");
		}

	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto user) {

		// Check if a user with the same email already exists
		Optional<User> existingUser = userRepo.findByEmail(user.getEmail());
		if (existingUser.isPresent()) {
			return new ResponseEntity<>("Email is already registered!", HttpStatus.CONFLICT);
		}

		// Encrypt the password before saving
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		user.setRole("ROLE_"+user.getRole());	
		UserDto savedUser = userService.createUser(user);

		// Return a response with the saved user data
		return new ResponseEntity<>(savedUser, HttpStatus.CREATED);

	}

	public UserDto userToDto(User user) {
		UserDto userDto = this.modelMapper.map(user, UserDto.class);
		return userDto;
	}

	@GetMapping("/user-profile")
	public ResponseEntity<?> getUser(@RequestHeader("Authorization") String token) {
		// Remove "Bearer " prefix if it exists
		if (token.startsWith("Bearer ")) {
			token = token.substring(7);
		}

		String username = this.jwtTokenHelper.getUsernameFromToken(token);

		UserDto user = this.userService.getByEmail(username);

		return ResponseEntity.ok(user);
	}

}

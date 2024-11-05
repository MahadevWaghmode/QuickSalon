package com.salon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salon.entities.Salon;
import com.salon.security.JwtTokenHelper;
import com.salon.service.SalonService;

@RestController
@CrossOrigin
@RequestMapping("/api/salon")
public class SalonController {

	@Autowired
	private SalonService salonService;
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	// create new salon of user
	@PostMapping
	public ResponseEntity<Salon> addSalon(@RequestBody Salon salon,@RequestHeader("Authorization") String token) {
		

		// Remove "Bearer " prefix if it exists
				if (token.startsWith("Bearer ")) {
					token = token.substring(7);
				}

				int userId = this.jwtTokenHelper.getUserId(token);

		Salon createdSalon = this.salonService.createSalon(userId, salon);

		return new ResponseEntity<Salon>(createdSalon, HttpStatus.CREATED);
	}
	

	@GetMapping
	public ResponseEntity<?> getAllUserSalons(@RequestHeader("Authorization") String token) {
		
		// Remove "Bearer " prefix if it exists
				if (token.startsWith("Bearer ")) {
					token = token.substring(7);
				}

				int userId = this.jwtTokenHelper.getUserId(token);

		
		return ResponseEntity.ok(this.salonService.getUserSalons(userId));
	}

	// delete salon data using salon id
//	@DeleteMapping("/{id}")
//	public String deleteSalon(@PathVariable Integer id) {
//
//		this.salonService.deleteSalon(id);
//
//		return "deleted";
//	}
//
//	// Update salon data using salon id
//	@PutMapping("/{id}")
//	public Salon updateSalon(@PathVariable Integer id, @RequestBody Salon salon) {
//
//		Salon updatedSalon = this.salonService.updateSalon(salon, id);
//
//		return updatedSalon;
//	}


}

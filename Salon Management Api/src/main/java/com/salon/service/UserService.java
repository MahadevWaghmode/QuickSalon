package com.salon.service;

import java.util.List;

import com.salon.payloads.UserDto;

public interface UserService {

	
	UserDto createUser(UserDto user);

	UserDto updateUser(UserDto user, Integer userId);

	UserDto getUserById(Integer userId);

	List<UserDto> getAllUsers();

	void deleteUser(Integer userId);

	UserDto getByEmail(String username);

}

package com.salon.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salon.entities.Role;

public interface RoleRepo  extends JpaRepository<Role, Integer>{

}

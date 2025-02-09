package com.velikkom.demo.repository;


import com.velikkom.demo.entity.concretes.user.Role;
import com.velikkom.demo.entity.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}

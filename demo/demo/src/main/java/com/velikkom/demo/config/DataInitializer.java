package com.velikkom.demo.config;

import com.velikkom.demo.entity.concretes.user.Role;
import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.entity.enums.RoleType;
import com.velikkom.demo.repository.RoleRepository;
import com.velikkom.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // Roller veritabanında yoksa oluştur
            if (roleRepository.findByName(RoleType.ROLE_ADMIN).isEmpty()) {
                roleRepository.save(new Role(null, RoleType.ROLE_ADMIN));
            }
            if (roleRepository.findByName(RoleType.ROLE_USER).isEmpty()) {
                roleRepository.save(new Role(null, RoleType.ROLE_USER));
            }
            if (roleRepository.findByName(RoleType.ROLE_PLASIYER).isEmpty()) {
                roleRepository.save(new Role(null, RoleType.ROLE_PLASIYER));
            }

            // Süper kullanıcı oluştur
            if (userRepository.findByUsername("admin").isEmpty()) {
                Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN).get();

                User adminUser = User.builder()
                        .username("admin")
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("Admin123!"))
                        .roles(Set.of(adminRole))
                        .active(true)
                        .isNewUser(false)
                        .build();

                userRepository.save(adminUser);
                System.out.println("✅ Süper Kullanıcı: admin / Admin123!");
            }

            // Plasiyer kullanıcı oluştur
            if (userRepository.findByUsername("plasiyer").isEmpty()) {
                Role plasiyerRole = roleRepository.findByName(RoleType.ROLE_PLASIYER).get();

                User plasiyerUser = User.builder()
                        .username("plasiyer")
                        .email("plasiyer@example.com")
                        .password(passwordEncoder.encode("Plasiyer123!"))
                        .roles(Set.of(plasiyerRole))
                        .active(true)
                        .isNewUser(false)
                        .build();

                userRepository.save(plasiyerUser);
                System.out.println("✅ Plasiyer Kullanıcı: plasiyer / Plasiyer123!");
            }
        };
    }
}

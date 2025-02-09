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
            // Eğer roller veritabanında yoksa, ekle
            if (roleRepository.findByName(RoleType.ROLE_ADMIN).isEmpty()) {
                roleRepository.save(new Role(null, RoleType.ROLE_ADMIN));
            }
            if (roleRepository.findByName(RoleType.ROLE_USER).isEmpty()) {
                roleRepository.save(new Role(null, RoleType.ROLE_USER));
            }

            // Eğer süper kullanıcı veritabanında yoksa, ekle
            if (userRepository.findByUsername("admin").isEmpty()) {
                Role adminRole = roleRepository.findByName(RoleType.ROLE_ADMIN).get();

                User adminUser = User.builder()
                        .username("admin")
                        .email("admin@example.com")
                        .password(passwordEncoder.encode("Admin123!")) // Şifre Hashlenmiş Olmalı!
                        .roles(Set.of(adminRole))
                        .build();

                userRepository.save(adminUser);
                System.out.println("🛠️ Süper Kullanıcı Oluşturuldu: admin / Admin123!");
            }
        };
    }
}

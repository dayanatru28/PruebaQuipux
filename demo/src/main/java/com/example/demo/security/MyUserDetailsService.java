package com.example.demo.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private static final String ENCODED_PASSWORD = "$2a$10$WSxe9KSG/9WwJnn5IwgQSO0dlZwi6obCkCvft3jJ2Eozh3lbLt2MW";
    //Clave admin123

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if ("admin".equals(username)) {
            return User.withUsername("admin")
                    .password(ENCODED_PASSWORD) 
                    

                    .roles("USER")
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }

}

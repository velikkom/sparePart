package com.velikkom.demo.security.jwt;

import com.velikkom.demo.security.service.UserDetailsServiceImpl;
import io.micrometer.common.lang.NonNullApi;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@NonNullApi
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = jwtUtils.getTokenFromRequest(request);
            System.out.println("🟡 Token geldi: " + token);

            if (token != null && jwtUtils.validateToken(token)) {
                String email = jwtUtils.getUsernameFromToken(token);
                System.out.println("🟢 Kullanıcı (token içinden): " + email);

                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);

                // 🔎 LOG: roller
                System.out.println("✅ Yetkiler: " + userDetails.getAuthorities());
                System.out.println("✅ Auth nesnesi: " + authentication.getAuthorities());
            }

        } catch (Exception e) {
            System.out.println("❌ JWT filtreleme hatası: " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }
}

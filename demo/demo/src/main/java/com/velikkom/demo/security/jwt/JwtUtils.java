package com.velikkom.demo.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtils {

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.expiration-time}")
    private long expirationTime;


    @Value("${jwt.token-prefix}")
    private String tokenPrefix;

    @Value("${jwt.header-string}")
    private String headerString;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Kullanıcı adıyla JWT token oluşturur.
     */
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Token içindeki kullanıcı adını döndürür.
     */
    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Token geçerliliğini kontrol eder.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            System.out.println("JWT süresi dolmuş: " + e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println("Geçersiz JWT token: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println("Desteklenmeyen JWT token: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println("Boş JWT token: " + e.getMessage());
        }
        return false;
    }

    /**
     * HTTP isteğinden Authorization başlığını alır ve "Bearer " kısmını temizleyerek token'ı döndürür.
     */
    public String getTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader(headerString);
        if (header != null && header.startsWith(tokenPrefix + " ")) {
            return header.substring(tokenPrefix.length() + 1);
        }
        return null;
    }
}

package com.velikkom.demo.security.jwt;

import com.velikkom.demo.entity.concretes.user.User;
import com.velikkom.demo.security.service.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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
     * Kullanıcı nesnesiyle JWT token oluşturur.
     */
    public String generateToken(User user) {
        List<String> roles = user.getRoles()
                .stream()
                .map(r -> r.getName().name())
                .collect(Collectors.toList());

        return Jwts.builder()
                .setSubject(user.getEmail()) // sub olarak email
                .claim("id",user.getId())
                .claim("roles", roles)       // roller claim'e eklendi
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

    /**
     * Token içindeki kullanıcı ID bilgisini döndürür.
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("id", Long.class);
    }

    /**
     * Token içindeki roller listesini döndürür.
     */
    public List<String> getRolesFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.get("roles", List.class);
    }

}

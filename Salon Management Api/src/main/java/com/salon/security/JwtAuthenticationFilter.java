package com.salon.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException; // Import SignatureException
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. get token
        String requestToken = request.getHeader("Authorization");
//        Enumeration<String> headerNames = request.getHeaderNames();

//        while (headerNames.hasMoreElements()) {
//            System.out.println(headerNames.nextElement());
//        }

        System.out.println(requestToken);

        String username = null;
        String token = null;

        if (requestToken != null && requestToken.startsWith("Bearer ")) {
            token = requestToken.substring(7); // Remove "Bearer " prefix

            try {
                username = this.jwtTokenHelper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get Jwt token");
            } catch (ExpiredJwtException e) {
            	System.out.println("Jwt token has expired");
//                throw new ExpiredJwtException(null, null, token);
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Set 401 status
//                response.getWriter().write("JWT token has expired. Please log in again.");
//                return;
            } catch (MalformedJwtException e) {
                System.out.println("Invalid JWT");
               
            } catch (SignatureException e) {
                System.out.println("Invalid JWT signature");
                 // Propagate exception
            }
        } else {
            System.out.println("Jwt token does not begin with Bearer");
        }

        // Once we get the token, now validate
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (this.jwtTokenHelper.validateToken(token, userDetails)) {
                // Successful authentication
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                System.out.println("Invalid JWT token");
            }
        } else {
            System.out.println("Username is null or context is not null");
        }

        filterChain.doFilter(request, response);
    }
}
package org.example.dacnpm.config;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SercurityConfig {
	@Value("${jwt.sig}")
	private String signerKey;
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		final String[] DENIEND_POST = { "/v1/account/doctor" };
		final String[] POST_USER = {"v1/booking/add"};
		final String[] PUT_USER = {"v1/patients/patient/{id}","/v1/booking/cancel/{id}"};
		final String[] ADMIN_GET = {"v1/account/users","v1/account/doctors"};

		httpSecurity.authorizeHttpRequests(request -> 
		request.requestMatchers(HttpMethod.POST, DENIEND_POST)
				.hasAnyAuthority("SCOPE_admin")
				.requestMatchers(HttpMethod.POST,POST_USER).authenticated()
				.requestMatchers(HttpMethod.GET,ADMIN_GET).hasAnyAuthority("SCOPE_admin")
				.requestMatchers(HttpMethod.PUT, PUT_USER).authenticated()
				.requestMatchers(HttpMethod.PUT,"v1/account/changeStatus/").hasAnyAuthority("SCOPE_admin")
				.requestMatchers(HttpMethod.DELETE, "v1/account/doctor/{id}").hasAnyAuthority("SCOPE_admin")
				.anyRequest().permitAll()

		);
		httpSecurity.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder())));

		httpSecurity.csrf(AbstractHttpConfigurer::disable);

		return httpSecurity.build();
	}
	
	   @Bean
	    JwtDecoder jwtDecoder() {
	        SecretKeySpec secretKeySpec =  new SecretKeySpec(signerKey.getBytes(), "HS512");


	        return NimbusJwtDecoder
	                .withSecretKey(secretKeySpec)
	                .macAlgorithm(MacAlgorithm.HS512)
	                .build();
	    }

}

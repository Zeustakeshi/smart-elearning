/*
 *  JwtConfig
 *  @author: minhhieuano
 *  @created 7/9/2025 10:34 PM
 * */

package com.smartelearning.smartelearning.config;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.OctetSequenceKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.smartelearning.smartelearning.common.properties.AccessTokenProperties;
import com.smartelearning.smartelearning.common.properties.RefreshTokenProperties;
import java.nio.charset.StandardCharsets;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

@Configuration
@EnableConfigurationProperties({AccessTokenProperties.class, RefreshTokenProperties.class})
public class JwtConfig {
	private final String accessTokenSecret;
	private final String refreshTokenSecret;

	public JwtConfig(AccessTokenProperties accessTokenProperties, RefreshTokenProperties refreshTokenProperties) {
		accessTokenSecret = accessTokenProperties.secret();
		refreshTokenSecret = refreshTokenProperties.secret();
	}

	@Bean("access_token_encoder")
	@Primary
	public JwtEncoder accessTokenEncoder() {
		JWK jwk = new OctetSequenceKey.Builder(accessTokenSecret.getBytes(StandardCharsets.UTF_8)).build();
		JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
		return new NimbusJwtEncoder(jwkSource);
	}

	@Bean(name = "refresh_token_encoder")
	public JwtEncoder refreshTokenEncoder() {
		JWK jwk = new OctetSequenceKey.Builder(refreshTokenSecret.getBytes(StandardCharsets.UTF_8)).build();
		JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
		return new NimbusJwtEncoder(jwkSource);
	}

	@Bean(name = "access_token_decoder")
	@Primary
	JwtDecoder accessTokenDecoder() {
		JWK jwk = new OctetSequenceKey.Builder(accessTokenSecret.getBytes(StandardCharsets.UTF_8)).build();
		return NimbusJwtDecoder.withSecretKey(jwk.toOctetSequenceKey().toSecretKey())
				.macAlgorithm(MacAlgorithm.HS256)
				.build();
	}

	@Bean(name = "refresh_token_decoder")
	JwtDecoder refreshTokenDecoder() {
		JWK jwk = new OctetSequenceKey.Builder(refreshTokenSecret.getBytes(StandardCharsets.UTF_8)).build();
		return NimbusJwtDecoder.withSecretKey(jwk.toOctetSequenceKey().toSecretKey())
				.macAlgorithm(MacAlgorithm.HS256)
				.build();
	}
}

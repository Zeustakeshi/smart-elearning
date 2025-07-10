/*
 *  AccessTokenProperties
 *  @author: minhhieuano
 *  @created 7/9/2025 10:35 PM
 * */

package com.smartelearning.smartelearning.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.security.jwt.refresh-token")
public record RefreshTokenProperties(String secret, Integer expireIn) {}

/*
 *  AccessTokenProperties
 *  @author: minhhieuano
 *  @created 7/9/2025 10:35 PM
 * */

package com.smartelearning.smartelearning.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.security.jwt.access-token")
public record AccessTokenProperties(String secret, Integer expireIn) {}

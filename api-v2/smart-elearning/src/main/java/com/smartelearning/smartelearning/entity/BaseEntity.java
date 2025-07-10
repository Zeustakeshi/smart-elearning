/*
 *  BaseEntity
 *  @author: minhhieuano
 *  @created 7/9/2025 9:42 PM
 * */

package com.smartelearning.smartelearning.entity;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseEntity {

	@Builder.Default
	private String id = NanoIdUtils.randomNanoId();

	@CreatedDate
	private Instant createdAt;

	@LastModifiedDate
	private Instant updatedAt;
}

/*
 *  Account
 *  @author: minhhieuano
 *  @created 7/9/2025 9:46 PM
 * */

package com.smartelearning.smartelearning.entity;

import com.smartelearning.smartelearning.common.enums.Role;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Account extends BaseEntity implements UserDetails {
	private String username;
	private String fullName;
	private String email;
	private String phone;
	private String password;
	private Role role;
	private String avatar;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_" + this.role));
	}
}

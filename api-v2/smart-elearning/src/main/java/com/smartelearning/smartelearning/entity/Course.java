/*
 *  Account
 *  @author: minhhieuano
 *  @created 7/9/2025 9:46 PM
 * */

package com.smartelearning.smartelearning.entity;

import com.smartelearning.smartelearning.common.enums.CoursePermission;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Course extends BaseEntity {
    private String name;
    private String avatar;
    private String background;
    private String teacherId;
    private String description;
    private CoursePermission permission;
}

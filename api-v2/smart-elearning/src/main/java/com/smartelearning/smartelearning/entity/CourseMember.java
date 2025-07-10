/*
 *  CourseMember
 *  @author: minhhieuano
 *  @created 7/10/2025 3:58 PM
 * */


package com.smartelearning.smartelearning.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.Instant;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class CourseMember extends BaseEntity {
    private String courseId;
    private String studentId;
    private Instant enrolledOn;
}

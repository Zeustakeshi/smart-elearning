/*
 *  CourseResponse
 *  @author: minhhieuano
 *  @created 7/10/2025 4:07 PM
 * */


package com.smartelearning.smartelearning.dto.response;

import com.smartelearning.smartelearning.common.enums.CoursePermission;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseResponse {
    private String id;
    private String avatar;
    private String name;
    private String description;
    private String background;
    private CoursePermission permission;
    private UserPublicInfoResponse teacher;
    private Integer lessonCount;
    private Integer studentCount;
}

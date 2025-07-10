/*
 *  CourseService
 *  @author: minhhieuano
 *  @created 7/10/2025 4:01 PM
 * */


package com.smartelearning.smartelearning.service;

import com.smartelearning.smartelearning.dto.request.CourseRequest;
import com.smartelearning.smartelearning.dto.request.UpdateCourseAvatarRequest;
import com.smartelearning.smartelearning.dto.response.CourseResponse;
import com.smartelearning.smartelearning.entity.Account;

public interface CourseService {
    CourseResponse createCourse(CourseRequest request, Account teacher);

    String updateCourseAvatar(String courseId, UpdateCourseAvatarRequest request, Account teacher);
}

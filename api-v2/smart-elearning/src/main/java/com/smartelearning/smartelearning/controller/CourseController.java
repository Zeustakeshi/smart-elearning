/*
 *  CourseController
 *  @author: minhhieuano
 *  @created 7/10/2025 4:03 PM
 * */


package com.smartelearning.smartelearning.controller;

import com.smartelearning.smartelearning.dto.common.ApiResponse;
import com.smartelearning.smartelearning.dto.request.CourseRequest;
import com.smartelearning.smartelearning.dto.response.CourseResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ApiResponse<CourseResponse> createCourse(
            @RequestBody @Valid CourseRequest request,
            @AuthenticationPrincipal Account account
    ) {
        return ApiResponse.success(courseService.createCourse(request, account));
    }
}

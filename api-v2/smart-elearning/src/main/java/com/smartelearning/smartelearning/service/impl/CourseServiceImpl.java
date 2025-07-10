/*
 *  CourseServiceImpl
 *  @author: minhhieuano
 *  @created 7/10/2025 4:01 PM
 * */


package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.dto.request.CourseRequest;
import com.smartelearning.smartelearning.dto.response.CourseResponse;
import com.smartelearning.smartelearning.entity.Account;
import com.smartelearning.smartelearning.entity.Course;
import com.smartelearning.smartelearning.mapper.CourseMapper;
import com.smartelearning.smartelearning.repository.CourseRepository;
import com.smartelearning.smartelearning.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper = CourseMapper.INSTANCE;

    @Value("${resources.default-avatar.course}")
    private String defaultCourseAvatar;

    @Value("${resources.default-background.course}")
    private String defaultCourseBackground;

    @Override
    public CourseResponse createCourse(CourseRequest request, Account teacher) {
        Course course = courseMapper.toCourse(request);
        course.setAvatar(defaultCourseAvatar);
        course.setBackground(defaultCourseBackground);
        course.setTeacherId(teacher.getId());

        courseRepository.save(course);

        return courseMapper.toCourseResponse(course);
    }
}

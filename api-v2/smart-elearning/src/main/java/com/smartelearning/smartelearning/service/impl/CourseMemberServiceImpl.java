/*
 *  CourseMemberService
 *  @author: minhhieuano
 *  @created 7/10/2025 4:02 PM
 * */


package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.repository.CourseRepository;
import com.smartelearning.smartelearning.service.CourseMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CourseMemberServiceImpl implements CourseMemberService {
    private final CourseRepository courseRepository;
}

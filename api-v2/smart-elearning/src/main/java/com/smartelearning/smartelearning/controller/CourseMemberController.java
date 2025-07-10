/*
 *  CourseMemberController
 *  @author: minhhieuano
 *  @created 7/10/2025 4:03 PM
 * */


package com.smartelearning.smartelearning.controller;

import com.smartelearning.smartelearning.service.CourseMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses/members")
@RequiredArgsConstructor
public class CourseMemberController {
    private final CourseMemberService courseMemberService;
}

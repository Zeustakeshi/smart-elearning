/*
 *  CourseMapper
 *  @author: minhhieuano
 *  @created 7/10/2025 4:22 PM
 * */

package com.smartelearning.smartelearning.mapper;

import com.smartelearning.smartelearning.dto.request.CourseRequest;
import com.smartelearning.smartelearning.dto.response.CourseResponse;
import com.smartelearning.smartelearning.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {
    CourseMapper INSTANCE = Mappers.getMapper(CourseMapper.class);

    Course toCourse(CourseRequest request);

    @Mapping(target = "teacher", ignore = true)
    @Mapping(target = "lessonCount", ignore = true)
    @Mapping(target = "studentCount", ignore = true)
    CourseResponse toCourseResponse(Course course);

}

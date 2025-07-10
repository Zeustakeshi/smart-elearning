/*
 *  CourseRepository
 *  @author: minhhieuano
 *  @created 7/10/2025 4:00 PM
 * */

package com.smartelearning.smartelearning.repository;

import com.smartelearning.smartelearning.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {

    Optional<Course> findByIdAndTeacherId(String courseId, String teacherId);
}

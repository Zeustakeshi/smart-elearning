/*
 *  CourseRepository
 *  @author: minhhieuano
 *  @created 7/10/2025 4:00 PM
 * */

package com.smartelearning.smartelearning.repository;

import com.smartelearning.smartelearning.entity.CourseMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseMemberRepository extends MongoRepository<CourseMember, String> {
    Integer countAllByCourseId(String courseId);
}

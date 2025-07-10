/*
 *  UpdateCourseAvatarRequest
 *  @author: minhhieuano
 *  @created 7/11/2025 12:11 AM
 * */


package com.smartelearning.smartelearning.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdateCourseAvatarRequest {
    @NotNull(message = "Avatar file is required")
    private MultipartFile avatar;
}

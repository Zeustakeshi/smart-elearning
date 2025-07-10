/*
 *  CourseRequest
 *  @author: minhhieuano
 *  @created 7/10/2025 4:04 PM
 * */


package com.smartelearning.smartelearning.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CourseRequest {
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 5, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Permission cannot be empty")
    @Pattern(regexp = "PUBLIC|PRIVATE|LINK_ONLY", message = "Permission must be one of: PUBLIC, PRIVATE, LINK_ONLY")
    private String permission;

    @Size(max = 2000, message = "Description cannot exceed 500 characters")
    private String description;
}

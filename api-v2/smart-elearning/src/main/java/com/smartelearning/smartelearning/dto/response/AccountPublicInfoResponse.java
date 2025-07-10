/*
 *  TeacherInfoResponse
 *  @author: minhhieuano
 *  @created 7/10/2025 4:08 PM
 * */


package com.smartelearning.smartelearning.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountPublicInfoResponse {
    private String id;
    private String name;
    private String avatar;
    private String email;
}

/*
 *  TestUploadController
 *  @author: minhhieuano
 *  @created 7/11/2025 1:04 AM
 * */


package com.smartelearning.smartelearning.service.impl;

import com.smartelearning.smartelearning.dto.common.ApiResponse;
import com.smartelearning.smartelearning.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestUploadController {
    private final FileStorageService storageService;

    @GetMapping("upload")
    public ApiResponse<String> uploadFile(
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        String url = storageService.uploadFile(file, "avatar", Map.of());
        return ApiResponse.success(url);
    }

}

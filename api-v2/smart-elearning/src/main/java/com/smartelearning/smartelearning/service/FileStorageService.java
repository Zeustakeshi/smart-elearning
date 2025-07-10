/*
 *  FileUploaderService
 *  @author: minhhieuano
 *  @created 7/11/2025 12:17 AM
 * */

package com.smartelearning.smartelearning.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface FileStorageService {
    String uploadFile(MultipartFile file, String path, Map<String, String> metadata) throws IOException;

    String deleteFile(String path, String fileName);
}

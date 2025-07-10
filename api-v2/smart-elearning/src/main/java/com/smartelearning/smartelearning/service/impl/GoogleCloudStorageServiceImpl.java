/*
 *  GoogleCloudStorageServiceImpl
 *  @author: minhhieuano
 *  @created 7/11/2025 1:00 AM
 * */


package com.smartelearning.smartelearning.service.impl;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.smartelearning.smartelearning.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class GoogleCloudStorageServiceImpl implements FileStorageService {

    private final Storage storage = StorageOptions.getDefaultInstance().getService();

    @Override
    public String uploadFile(MultipartFile file, String path, Map<String, String> metadata) throws IOException {
        BlobId blobId = BlobId.of(path, Objects.requireNonNull(file.getOriginalFilename()));
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        storage.create(blobInfo, file.getBytes());
        return String.format("https://storage.googleapis.com/%s/%s", path, file.getOriginalFilename());
    }

    @Override
    public String deleteFile(String path, String fileName) {
        return "";
    }
}

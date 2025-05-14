package com.ptu.noriteo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileUploadService {

    // c 아래에 upload 폴더에 저장할 경우
//    @Value("${upload.path}")
//    private String uploadDir;
    // static 아래에 uploads 폴더에 저장할 경우
//private final String uploadDir = "src/main/resources/static/uploads/";
// 바깥에서 수정 가능하게
    @Value("${upload.path}")
    private String uploadDir;


    public String upload(String subDir, MultipartFile file) {
        try {
            // 하위 폴더 포함 경로 설정
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path targetDir = Paths.get(uploadDir + subDir); // 예: board, users
//            Path targetDir = Paths.get(uploadDir + "/" + subDir);
            Files.createDirectories(targetDir); // 폴더 없으면 자동 생성

            Path path = targetDir.resolve(filename);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + subDir + "/" + filename; // 접근 경로 반환
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패", e);
        }
    }

}

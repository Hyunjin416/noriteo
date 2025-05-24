//package com.ptu.noriteo.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.nio.file.StandardCopyOption;
//import java.util.UUID;
//
//@Service
//public class FileUploadService {
//
//    @Value("${upload.path}")
//    private String uploadDir;
//
//
//    public String upload(String subDir, MultipartFile file) {
//        try {
//            String originalFileName = file.getOriginalFilename();
//            String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
//            String filename = UUID.randomUUID() + extension;
//
//
//            Path targetDir = Paths.get(uploadDir + subDir);
//            Files.createDirectories(targetDir);
//
//            Path path = targetDir.resolve(filename);
//            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
//
//            return "/upload/" + subDir + "/" + filename;
//        } catch (IOException e) {
//            throw new RuntimeException("파일 업로드 실패", e);
//        }
//    }
//
//
//}

package com.ptu.noriteo.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
public class FileUploadService {

    @Value("${upload.path}")
    private String uploadPath;

    /**
     * 파일 업로드 처리
     *
     * @param folderType  예: "board", "users", etc.
     * @param file        MultipartFile
     * @param subFolder   예: "free", "notice" (null 가능)
     * @return 업로드된 상대 경로 (예: /upload/board/free/abc123.png)
     */
    public String upload(String folderType, MultipartFile file, String subFolder) {
        if (file.isEmpty()) return null;

        // 원본 파일명
        String originalFilename = file.getOriginalFilename();
        String ext = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf("."))
                : "";

        // 고유 이름 생성
        String uuid = UUID.randomUUID().toString();
        String sysName = uuid + "_" + originalFilename;

        // 저장할 실제 경로 구성
        String folder = subFolder != null ? folderType + "/" + subFolder : folderType;
        String fullPath = uploadPath + folder + File.separator;

        // 폴더가 없다면 생성
        File dir = new File(fullPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try {
            File dest = new File(fullPath + sysName);
            file.transferTo(dest);
        } catch (IOException e) {
            log.error("파일 저장 중 오류 발생", e);
            throw new RuntimeException("파일 업로드 실패");
        }

        // 브라우저에서 접근 가능한 상대경로 반환
        return "/upload/" + folder + "/" + sysName;
    }

    // 기존 upload(String folderType, MultipartFile file) 유지 → 하위 호환
    public String upload(String folderType, MultipartFile file) {
        return upload(folderType, file, null);
    }
}

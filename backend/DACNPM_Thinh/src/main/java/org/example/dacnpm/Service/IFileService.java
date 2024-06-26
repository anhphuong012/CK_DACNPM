package org.example.dacnpm.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.InputStream;

public interface IFileService {
	InputStream getResourceFile(String path, String name) throws FileNotFoundException;
	String uploadFile(String path, String name, MultipartFile multipartFile);

}

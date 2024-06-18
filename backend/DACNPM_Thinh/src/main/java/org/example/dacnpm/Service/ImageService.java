package org.example.dacnpm.Service;


import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService implements IFileService {

	@Override
	public InputStream getResourceFile(String path, String name) throws FileNotFoundException {
		String filePath = path + File.separator + name;
		return new FileInputStream(filePath);
	}

	@Override
	public String uploadFile(String path, String name, MultipartFile multipartFile) {
		String filePath = path + File.separator+ name;
		File f = new File(path);

		if(!f.exists()){
			f.mkdir();
		}

		try {
			Files.copy(multipartFile.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
			multipartFile.getInputStream().close();

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return filePath;
	}

}

package org.example.dacnpm.controller;

import java.io.IOException;
import java.io.InputStream;

import org.example.dacnpm.Service.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/file/")
public class ImageController {
	@Value("${image.storage.path}")
	private String path;
	
	@Autowired
	IFileService fileService;

	@GetMapping("/{fileName}")
	public void serverFileHandle(@PathVariable String fileName, HttpServletResponse response) throws IOException {

			InputStream resourceFile = fileService.getResourceFile(path, fileName);
			response.setContentType(MediaType.IMAGE_JPEG_VALUE);
			StreamUtils.copy(resourceFile, response.getOutputStream());
			resourceFile.close();
	}

}

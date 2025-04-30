package com.velikkom.demo.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface ExcelImportService {


    void importFirmsFromExcel(MultipartFile file);
}
package com.ptu.noriteo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.ptu.noriteo.mapper")
public class NoriteoApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoriteoApplication.class, args);
	}

}

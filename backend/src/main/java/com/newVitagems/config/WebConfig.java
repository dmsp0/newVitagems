package com.newVitagems.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins("http://localhost:3000") // 허용할 오리진
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*")
                .allowCredentials(true); // 자격 증명 포함 허용
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // String을 반환할 때 기본적으로 UTF-8로 인코딩
        converters.add(new StringHttpMessageConverter(StandardCharsets.UTF_8));
    }
}
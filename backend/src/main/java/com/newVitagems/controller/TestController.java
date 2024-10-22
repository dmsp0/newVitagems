package com.newVitagems.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String testEndpoint() {
        return "Test endpoint is working! 잘 연결됩니다.";
    }
}

package com.newVitagems.controller;

import com.newVitagems.request.LoginRequest;
import com.newVitagems.response.LoginResponse;
import com.newVitagems.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = authService.login(loginRequest);

//        // 응답 디버깅
//        System.out.println("AuthController - 로그인 결과: " + response.getMessage());
//        System.out.println("AuthController - 사원 이름: " + response.getEmployeeName());

        if("로그인 성공!".equals(response.getMessage())){
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(response);
        }
    }
}

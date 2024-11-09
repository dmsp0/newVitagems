package com.newVitagems.service;

import com.newVitagems.entity.Employee;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final Employee employee;

    public CustomUserDetails(Employee employee) {
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // ROLE_ 접두사를 추가하여 Spring Security가 인식하도록 설정
        return List.of(new SimpleGrantedAuthority("ROLE_" + employee.getAuthority().name()));
    }

    @Override
    public String getPassword() {
        return employee.getEmployeePassword();
    }

    @Override
    public String getUsername() {
        return employee.getEmployeeCode();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}

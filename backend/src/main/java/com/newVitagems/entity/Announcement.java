package com.newVitagems.entity;

import com.newVitagems.enums.Category;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Entity
@Table(name = "announcement")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "noticeid")
    private int noticeId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    @Column(name = "publishdate", nullable = false)
    private LocalDateTime publishDate;

    @Lob
    @Column(name = "img")
    private byte[] img;

    // Many-to-One 관계로 Employee의 employeeCode를 외래 키로 사용
    @ManyToOne
    @JoinColumn(name = "employee_code", referencedColumnName = "employee_code", nullable = false)
    private Employee author;
}

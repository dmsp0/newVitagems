package com.newVitagems.dto;

import com.newVitagems.enums.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AnnouncementDto {

    private int noticeId;
    private String title;
    private String content;
    private Category category;
    private LocalDateTime publishDate;
    private byte[] img;
    private String authorId;

    // 기본 생성자
    public AnnouncementDto() {
    }

    // 모든 필드를 포함한 생성자
    public AnnouncementDto(int noticeId, String title, String content, Category category,
                           LocalDateTime publishDate, byte[] img, String authorId) {
        this.noticeId = noticeId;
        this.title = title;
        this.content = content;
        this.category = category;
        this.publishDate = publishDate;
        this.img = img;
        this.authorId = authorId;
    }
}

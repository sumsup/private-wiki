package com.zetta.pwiki.service.wiki;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity(name="contents")
@Data
@Builder
public class WikiDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;

    private String contents;
    private String title;
    private LocalDate createdAt = LocalDate.now();
    private LocalDate updatedAt;
    private LocalDate deletedAt;
    private boolean isDeleted;
    private int creatorId;

}
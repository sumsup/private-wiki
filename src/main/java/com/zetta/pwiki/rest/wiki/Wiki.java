package com.zetta.pwiki.rest.wiki;

import com.zetta.pwiki.rest.member.Member;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="wiki")
@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class Wiki {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;

    private String contents;
    private String title;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    @Column(name="created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
    private boolean isDeleted;

    // TODO : creatorId 컬럼에 값 어떻게 집어 넣는거야??.. 조인하면 그게 안되나? 왜 duplicated column name 이냐고..
//    private int creatorId;
    private boolean isPrivate;
    private LocalDateTime updatePrivateAt;

    // TODO : 조회시에 제외컬럼에 password 추가 하기.
    @ManyToOne
    @JoinColumn(name="creator_id")
    private Member member;

}
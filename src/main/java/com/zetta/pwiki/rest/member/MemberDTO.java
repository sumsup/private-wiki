package com.zetta.pwiki.rest.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity(name="member")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MemberDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;
    private String password;

    private LocalDateTime joinAt = LocalDateTime.now();
    private boolean exitYn;
    private LocalDateTime exitAt;

}

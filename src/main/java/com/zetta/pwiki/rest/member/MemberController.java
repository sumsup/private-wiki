package com.zetta.pwiki.rest.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("join")
    public MemberDTO joinMember(MemberDTO memberDTO) {
        return memberService.joinMember(memberDTO);
    }

}

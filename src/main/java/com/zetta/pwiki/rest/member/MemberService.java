package com.zetta.pwiki.rest.member;

import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberDTO joinMember(MemberDTO memberDTO) {
        return memberRepository.save(memberDTO);
    }



}

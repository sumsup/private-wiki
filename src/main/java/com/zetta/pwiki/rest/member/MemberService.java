package com.zetta.pwiki.rest.member;

import org.springframework.stereotype.Service;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member joinMember(Member member) {
        return memberRepository.save(member);
    }



}

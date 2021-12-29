package com.zetta.pwiki.pageview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberPageController {

    @GetMapping("page/member/join")
    public String memberJoin() {
        return "/page/member/join.html";
    }

    @GetMapping("page/member/login")
    public String memberLogin() {
        return "/page/member/login.html";
    }

}

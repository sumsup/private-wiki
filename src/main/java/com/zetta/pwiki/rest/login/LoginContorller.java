package com.zetta.pwiki.rest.login;

import com.zetta.pwiki.rest.member.MemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class LoginContorller {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public boolean login(MemberDTO memberDTO, HttpServletRequest request, HttpServletResponse response) {
        // 회원 로그인 확인 절차.
        boolean isLogin = loginService.loginMember(memberDTO);

        // 아이디에 해당하는 패스워드가 일치하면
        if (isLogin) {
            // 세션에 로그인 성공 구분값을 넣어줌.
            HttpSession session = request.getSession();
            session.setAttribute("loginResult", true);

            // 로그인 구분자를 쿠키에 삽입.
            Cookie cookie = new Cookie("isLogined", "true");
            response.addCookie(cookie);

            return true;

        } else { // 패스워드가 일치 하지 않으면?

            // 패스워드가 일치 하지 않음을 어떻게 전달할까. 뭘로 전달할까.
            // 로그인 실패니까 false로 전달하자.
            // TODO : 그런데 왜 실패했는지도 구분해야 되지 않을까?... 그건 나중에 반영 고고.
            return false;
        }

    }

    @PostMapping("/logout")
    public void logout(HttpSession session, HttpServletResponse response) throws IOException {
        // 서버에서 세션을 제거한다.
        session.invalidate();

        // 쿠키에 로그인 상태를 제거 한다.
        Cookie cookie = new Cookie("isLogined", null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);

    }

}
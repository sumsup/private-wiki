package com.zetta.pwiki.infra.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        // 로그인 상태여야지만 접근 가능한 URL 이라면?
        // 세션에 로그인 상태인지 확인하고 통과시켜 주자고.
        if (request.getSession().getAttribute("loginResult") != null) {
            return true;
        }

        // 로그인 상태가 아니라면?
        // 로그인 화면으로 이동 시켜서 로그인 하라고 하기.
        response.sendRedirect("/page/member/login");
        return false;
    }

}

package com.zetta.pwiki.infra.interceptor.restapi.commons;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 세션이 만룓되었다면, cookie에서 isLogined 값을 삭제.
        Boolean sessionLoginStatus = (Boolean) request.getSession().getAttribute("loginResult");
        if (sessionLoginStatus == null) {
            Cookie cookie = new Cookie("isLogined", "true");
            cookie.setPath("/"); // Path 값도 설정.
            cookie.setMaxAge(0);

            response.addCookie(cookie);
        }

        return true;
    }
}

package com.zetta.pwiki.infra.interceptor.restapi.commons;

import com.zetta.pwiki.util.WebUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 세션이 만룓되었다면, cookie에서 isLogined 값을 삭제.
        this.checkLoginStatusCookie(request, response);

        // Redirect 할 이전페이지 URL 저장.
        this.setRedirectPageAfterLogin(request);

        // 로그인이 필요한 페이지면, 로그인 페이지로 redirect.
        String requestURI = request.getRequestURI();
        if (StringUtils.equals(requestURI, "/page/wiki/list")) {
            if (WebUtils.isNotLogined(request)) {

                response.sendRedirect("/page/member/login");
                return false;
            }
        }

        return true;
    }

    private void checkLoginStatusCookie(HttpServletRequest request, HttpServletResponse response) {
        Boolean sessionLoginStatus = (Boolean) request.getSession().getAttribute("loginResult");
        if (sessionLoginStatus == null) {
            Cookie cookie = new Cookie("isLogined", "true");
            cookie.setPath("/"); // Path 값도 설정. 그렇지 않으면 쿠키는 같은 key로 중복저장 가능.
            cookie.setMaxAge(0);

            response.addCookie(cookie);
        }
    }

    private void setRedirectPageAfterLogin(HttpServletRequest request) {
        // 이전 페이지 정보 URL을 저장.
        String requestURL = request.getRequestURI();
        if (StringUtils.startsWith(requestURL, "/page")) {
            String prevPage = request.getRequestURL().toString();
            if (request.getQueryString() != null) {
                prevPage += "?" + request.getQueryString();
            }
            request.getSession().setAttribute("prevPage", prevPage);
        }
    }

}

package com.zetta.pwiki.infra.interceptor.page;

import com.zetta.pwiki.util.WebUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 페이지 컨트롤러 인터셉터.
 */
public class PageWikiListInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        if (WebUtils.isLogined(request)) {
            return true;
        }

        // 로그인 상태가 아니면 로그인 페이지로 리다이렉트.
        response.sendRedirect("/page/member/login");
        return false;
    }

}

package com.zetta.pwiki.infra.interceptor.restapi.commons;

import com.zetta.pwiki.util.WebUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RestLoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (WebUtils.isNotLogined(request)) {
            response.setStatus(401); // Unauthorized. 로그인 해라.
            return false;
        }

        return true;
    }
}

package com.zetta.pwiki.infra.interceptor.restapi.commons;

import com.zetta.pwiki.util.WebUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class RestLoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (WebUtils.isNotLogined(request)) {
            log.error("this request require login status. request URL : {}" , request.getRequestURI());
            response.setStatus(401); // Unauthorized. 로그인 해라.
            return false;
        }

        return true;
    }
}

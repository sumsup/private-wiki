package com.zetta.pwiki.infra.interceptor.restapi;

import com.zetta.pwiki.commons.WikiCommons;
import com.zetta.pwiki.util.WebUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class RestApiWikiUpdateOrDeleteInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 로그인 여부.
        if (WebUtils.isNotLogined(request)) {
            response.setStatus(403); // Forbidden.
            log.error("**:: Cannot check login info ::**");
            return false;
        }

        // 본인 위키 인지.
        Integer wikiId = WebUtils.getPathVariableWikiId(request);
        Integer userId = WebUtils.getLoginUserId(request);
        if (WikiCommons.isMatchWikiMaker(wikiId, userId)) {
            return true;
        } else {
            response.setStatus(401); // Unauthorized.
            log.info("you have not auth of modifying or deleteing this wiki");
            return false;
        }

    }
}

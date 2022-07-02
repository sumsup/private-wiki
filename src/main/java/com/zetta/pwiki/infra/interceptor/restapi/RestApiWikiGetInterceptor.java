package com.zetta.pwiki.infra.interceptor.restapi;

import com.zetta.pwiki.commons.WikiCommons;
import com.zetta.pwiki.util.WebUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RestApiWikiGetInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 위키가 전체공개면.
        Integer wikiId = WebUtils.getPathVariableWikiId(request);

        if (wikiId != null) {
            if (WikiCommons.isWikiPublic(wikiId)) {
                return true;
            }
        }

        // 로그인 상태가 아니라면 403 리턴.
        if (WebUtils.isNotLogined(request)) {
            response.setStatus(403); // Forbidden. Login 해라.
            return false;
        }

        // 작성자 일치하면 TRUE 리턴.
        Integer userId = (Integer) request.getSession().getAttribute("userId");
        if (userId != null && WikiCommons.isMatchWikiMaker(wikiId, userId)) {
            return true;
        } else {
            response.setStatus(401); // Unauthorized.
        }

        response.setStatus(400); // 어떤 것에도 해당되지 않으면. Bad Request.
        return false;
    }

}
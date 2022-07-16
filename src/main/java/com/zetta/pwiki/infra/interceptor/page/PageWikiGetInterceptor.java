package com.zetta.pwiki.infra.interceptor.page;

import com.zetta.pwiki.commons.WikiCommons;
import com.zetta.pwiki.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public class PageWikiGetInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Map queryStringMap = WebUtils.getQueryStringMap(request.getQueryString());

        // 1. 위키 id 값이 쿼리 스트링에 존재하지 않으면 잘못된 형식의 요청.
        if (StringUtils.isBlank((CharSequence) queryStringMap.get("id"))) {
            response.setStatus(400); // 위키 id 값이 없으니. 잘못된 요청. Bad Request.
            return false;

        }

        // 2. 위키가 전체 공개라면 통과.
        Integer wikiId = Integer.parseInt(String.valueOf(queryStringMap.get("id")));
        if (isWikiPublic(wikiId)) {
            return true;
        }

        // 4. 로그인한 유저가 작성한 위키가 맞으면 통과.
        if (WikiCommons.isMatchWikiMaker(wikiId, (Integer) request.getSession().getAttribute("userId"))) {
            return true;
        }

        return false;
    }

    private boolean isWikiPublic(Integer wikiId) {
        if (WikiCommons.isWikiPublic(wikiId)) {
            return true;
        }

        return false;
    }

}

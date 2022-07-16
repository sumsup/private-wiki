package com.zetta.pwiki.infra.interceptor.page;

import com.zetta.pwiki.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 페이지 컨트롤러 인터셉터.
 */
// TODO : MY LIST 진입시 처리 interceptor는 LoginCheckInterceptor로 통합함. 좀 지켜보다 별다른 이슈 없으면 삭제 예정.
@Deprecated
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

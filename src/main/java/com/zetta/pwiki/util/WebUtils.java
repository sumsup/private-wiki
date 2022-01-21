package com.zetta.pwiki.util;

import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

public class WebUtils {

    /**
     * 쿼리 스트링을 맵으로 가져옴.
     */
    public static HashMap<String, String> getQueryStringMap(String queryString) {
        String[] params = queryString.split("&");
        HashMap<String, String> map = new HashMap<>();

        for (String param : params) {
            String name = param.split("=")[0];
            String value = param.split("=")[1];
            map.put(name, value);
        }
        return map;

    }

    /**
     * Path Variables를 map으로 가져옴.
     */
    public static Integer getPathVariableWikiId(HttpServletRequest request) {
        Map pathVariablesMap = (Map) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        return Integer.parseInt(String.valueOf(pathVariablesMap.get("id")));
    }

    /**
     * 로그인 유저의 pk id 값을 가져옴.
     */
    public static Integer getLoginUserId(HttpServletRequest request) {
        return (Integer) request.getSession().getAttribute("userId");
    }

    /**
     * 로그인 상태인지.
     */
    public static boolean isLogined(HttpServletRequest request) {
        if (request.getSession().getAttribute("loginResult") != null) {
            return true;
        }
        return false;
    }

    /**
     * 로그인 상태가 아닌지.
     */
    public static boolean isNotLogined(HttpServletRequest request) {
        if (request.getSession().getAttribute("loginResult") != null) {
            return false;
        }
        return true;
    }

}

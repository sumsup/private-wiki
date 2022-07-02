package com.zetta.pwiki.pageview;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
public class WikiPageController {

    @GetMapping("page/wiki/all")
    public String allWikiList() {
        return "/page/wiki/all-wiki-list.html";
    }

    @GetMapping("page/wiki/list")
    public String wikiList() {
        return "/page/wiki/my-wiki-list.html";
    }

    @GetMapping("page/wiki/write")
    public String wikiWrite() {
        return "/page/wiki/wiki-write.html";
    }

    @GetMapping("page/wiki/get")
    public String wikiGet(@RequestParam Integer id, HttpServletResponse response) {
        Cookie cookie = new Cookie("id", id.toString());
        response.addCookie(cookie);
        return "/page/wiki/wiki-get.html";
    }

}

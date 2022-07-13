package com.zetta.pwiki.rest.wiki;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.beans.PropertyEditorSupport;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class WikiController {
    private final WikiService wikiService;

    public WikiController(WikiService wikiService) {
        this.wikiService = wikiService;
    }

    @InitBinder
    void setUp(WebDataBinder binder) {
        binder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) throws IllegalArgumentException {
                setValue(new Date(Long.valueOf(text)));
            }
        });
    }

    @GetMapping("/wiki/all")
    @ResponseBody
    public List<Wiki> searchAllWikiList() {
        return wikiService.searchAllList();
    }

    @GetMapping("/wiki/list")
    @ResponseBody
    public List<Wiki> searchWikiList(HttpSession userSession) {
        return wikiService.searchList(userSession);
    }

    @GetMapping("/wiki/get/{id}")
    public Optional<Wiki> findWikiById(@PathVariable Integer id) {
        return wikiService.findById(id);
    }

    @PostMapping("/wiki/save")
    public Wiki saveWiki(Wiki wiki, HttpSession userSession) {
        return wikiService.save(wiki, userSession);
    }

    @PostMapping("/wiki/update/{id}")
    public boolean updateWiki(Wiki wiki, HttpSession userSession) {
        return wikiService.update(wiki, userSession);
    }

    @DeleteMapping("/wiki/delete/{id}")
    public boolean deleteWiki(@PathVariable Integer id) {
        return wikiService.delete(id);
    }

}
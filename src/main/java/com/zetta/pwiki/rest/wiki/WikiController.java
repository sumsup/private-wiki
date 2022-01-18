package com.zetta.pwiki.rest.wiki;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
public class WikiController {
    private final WikiService wikiService;

    public WikiController(WikiService wikiService) {
        this.wikiService = wikiService;
    }

    @GetMapping("/wiki/all")
    @ResponseBody
    public List<WikiDTO> searchAllWikiList() {
        return wikiService.searchAllList();
    }

    @GetMapping("/wiki/list")
    @ResponseBody
    public List<WikiDTO> searchWikiList(HttpSession userSession) {
        return wikiService.searchList(userSession);
    }

    @GetMapping("/wiki/{id}")
    public Optional<WikiDTO> findWikiById(@PathVariable Integer id) {
        return wikiService.findById(id);
    }

    @PostMapping("/wiki/save")
    public WikiDTO saveWiki(WikiDTO wikiDTO, HttpSession UserSession) {
        return wikiService.save(wikiDTO, UserSession);
    }

    @PostMapping("/wiki/update/{id}")
    public boolean updateWiki(WikiDTO wikiDTO) {
        return wikiService.update(wikiDTO);
    }

    @DeleteMapping("/wiki/delete/{id}")
    public boolean deleteWiki(@PathVariable Integer id) {
        return wikiService.delete(id);
    }

}
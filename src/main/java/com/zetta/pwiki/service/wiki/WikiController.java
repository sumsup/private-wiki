package com.zetta.pwiki.service.wiki;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/wiki")
@Slf4j
public class WikiController {
    private final WikiService wikiService;

    public WikiController(WikiService wikiService) {
        this.wikiService = wikiService;
    }

    @GetMapping("/list")
    public List<WikiDTO> searchWikiList() {
        return wikiService.searchList();
    }

    @GetMapping("/{id}")
    public Optional<WikiDTO> findWikiById(@PathVariable Integer id) {
        return wikiService.findById(id);
    }

    @PostMapping("/save")
    public WikiDTO saveWiki(WikiDTO wikiDTO) {
        return wikiService.save(wikiDTO);
    }

    @PostMapping("/update/{id}")
    public boolean updateWiki(WikiDTO wikiDTO) {
        return wikiService.update(wikiDTO);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteWiki(@PathVariable Integer id) {
        return wikiService.delete(id);
    }


}

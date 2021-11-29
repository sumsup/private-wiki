package com.zetta.pwiki.service.wiki;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WikiService {

    private final WikiRepository wikiRepository;

    public WikiService(WikiRepository wikiRepository) {
        this.wikiRepository = wikiRepository;
    }

    // 전체 리스트 반환.
    public List<WikiDTO> searchList() {
        return wikiRepository.findAll();
    }

    // id로 검색하기.
    public Optional<WikiDTO> findById(Integer id) {
        return wikiRepository.findById(id);
    }

    // 위키 등록하기.
    public WikiDTO save(WikiDTO wikiDTO) {
        return wikiRepository.save(wikiDTO);
    }

    // 위키 수정.
    @Transactional
    public boolean update(WikiDTO wikiDTO) {
        Optional<WikiDTO> findWiki = wikiRepository.findById(wikiDTO.getId());

        if (!findWiki.isPresent()) {
            return false;
        }

        findWiki.ifPresent(
                wiki -> {
                    WikiDTO updatedWiki = WikiDTO.builder().id(wikiDTO.getId())
                            .updatedAt(LocalDate.now())
                            .createdAt(wikiDTO.getCreatedAt())
                            .contents(wikiDTO.getContents())
                            .title(wikiDTO.getTitle())
                            .creatorId(wikiDTO.getCreatorId())
                            .build();

                    wikiRepository.save(updatedWiki);
                }
        );

        return true;
    }

    @Transactional
    public boolean delete(Integer id) {
        Optional<WikiDTO> findWiki = wikiRepository.findById(id);

        if (findWiki.isPresent()) {
            wikiRepository.deleteById(id);

            return true;
        }

        return false;
    }

}
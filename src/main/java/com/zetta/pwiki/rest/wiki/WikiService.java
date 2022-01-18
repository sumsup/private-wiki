package com.zetta.pwiki.rest.wiki;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WikiService {

    private final WikiRepository wikiRepository;

    @PersistenceContext
    private EntityManager em;

    public WikiService(WikiRepository wikiRepository) {
        this.wikiRepository = wikiRepository;
    }

    // 메인화면의 전체 리스트 반환.
    public List<WikiDTO> searchAllList() {
        // 삭제 처리된 위키는 제외하는 조회조건 추가.
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<WikiDTO> cr = cb.createQuery(WikiDTO.class);
        Root wikiDTORoot = cr.from(WikiDTO.class);

        Predicate notDeleted = cb.isFalse(wikiDTORoot.get("isDeleted"));
        Predicate notPrivate = cb.isFalse(wikiDTORoot.get("isPrivate"));
        Predicate finalConditions = cb.and(notDeleted, notPrivate);

        cr.select(wikiDTORoot).where(finalConditions);

        return em.createQuery(cr).getResultList();
    }

    // 회원이 작성한 리스트 반환.
    public List<WikiDTO> searchList(HttpSession userSession) {
        // 삭제 처리된 위키는 제외하는 조회조건 추가.
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<WikiDTO> cr = cb.createQuery(WikiDTO.class);
        Root wikiDTORoot = cr.from(WikiDTO.class);

        Predicate equalCreatorId = cb.equal(wikiDTORoot.get("creatorId"), userSession.getAttribute("userId"));
        Predicate notDeleted = cb.isFalse(wikiDTORoot.get("isDeleted"));
        Predicate finalConditions = cb.and(equalCreatorId, notDeleted);

        cr.select(wikiDTORoot).where(finalConditions);

        return em.createQuery(cr).getResultList();
    }

    // id로 검색하기.
    public Optional<WikiDTO> findById(Integer id) {
        return wikiRepository.findById(id);
    }

    // 위키 등록하기.
    public WikiDTO save(WikiDTO wikiDTO, HttpSession userSession) {
        wikiDTO.setCreatorId((Integer) userSession.getAttribute("userId"));
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
                            .updatedAt(LocalDateTime.now())
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
        WikiDTO findWiki = wikiRepository.getById(id);

        if (findWiki == null) {
            return false;
        }

        findWiki.setDeleted(true);
        findWiki.setDeletedAt(LocalDateTime.now());

        wikiRepository.save(findWiki);

        return true;
    }

}
package com.zetta.pwiki.rest.wiki;

import com.zetta.pwiki.rest.member.Member;
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
    public List<Wiki> searchAllList() {
        // 삭제 처리된 위키는 제외하는 조회조건 추가.
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Wiki> cr = cb.createQuery(Wiki.class);
        Root wikiDTORoot = cr.from(Wiki.class);

        Predicate notDeleted = cb.isFalse(wikiDTORoot.get("isDeleted"));
        Predicate notPrivate = cb.isFalse(wikiDTORoot.get("isPrivate"));
        Predicate finalConditions = cb.and(notDeleted, notPrivate);

        cr.select(wikiDTORoot).where(finalConditions).orderBy(cb.desc(wikiDTORoot.get("id")));

        return em.createQuery(cr).getResultList();
    }

    // 회원이 작성한 리스트 반환.
    public List<Wiki> searchList(HttpSession userSession) {
        // 삭제 처리된 위키는 제외하는 조회조건 추가.
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Wiki> cr = cb.createQuery(Wiki.class);
        Root wikiDTORoot = cr.from(Wiki.class);

        Predicate equalCreatorId = cb.equal(wikiDTORoot.get("member").get("id"), userSession.getAttribute("userId"));
        Predicate notDeleted = cb.isFalse(wikiDTORoot.get("isDeleted"));
        Predicate finalConditions = cb.and(equalCreatorId, notDeleted);

        cr.select(wikiDTORoot).where(finalConditions).orderBy(cb.desc(wikiDTORoot.get("id")));

        return em.createQuery(cr).getResultList();
    }

    // id로 검색하기.
    public Optional<Wiki> findById(Integer id) {
        return wikiRepository.findById(id);
    }

    // 위키 등록하기.
    // TODO : created_at 컬럼을 default now()로 설정했는데 왜 null로 들어갈까??
    public Wiki save(Wiki wiki, HttpSession userSession) {
//        wiki.setCreatorId((Integer) userSession.getAttribute("userId"));
        Member member = new Member();
        member.setId((Integer) userSession.getAttribute("userId"));
        wiki.setMember(member);
        return wikiRepository.save(wiki);
    }

    // 위키 수정.
    @Transactional
    public boolean update(Wiki wikiDTO, HttpSession userSession) {
        Optional<Wiki> findWiki = wikiRepository.findById(wikiDTO.getId());

        if (!findWiki.isPresent()) {
            return false;
        }

        findWiki.ifPresent(wiki -> {
            wiki.setTitle(wikiDTO.getTitle());
            wiki.setContents(wikiDTO.getContents());
            wiki.setIsPrivate(wikiDTO.getIsPrivate());
//            wiki.getMember().setId((Integer) userSession.getAttribute("userId"));
        });

        return true;
    }

    @Transactional
    public boolean delete(Integer id) {
        Wiki findWiki = wikiRepository.getById(id);

        if (findWiki == null) {
            return false;
        }

        findWiki.setDeleted(true);
        findWiki.setDeletedAt(LocalDateTime.now());

        wikiRepository.save(findWiki);

        return true;
    }

}
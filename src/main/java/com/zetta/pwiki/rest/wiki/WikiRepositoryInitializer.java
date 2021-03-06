package com.zetta.pwiki.rest.wiki;

import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Component
public class WikiRepositoryInitializer {

    @PersistenceContext
    private EntityManager em;

    public WikiRepositoryInitializer(EntityManager entityManager) {
        this.em = entityManager;
    }

    public Wiki findById(Integer wikiId) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Wiki> cr = cb.createQuery(Wiki.class);
        Root wikiRoot = cr.from(Wiki.class);

        cr.select(wikiRoot).where(cb.equal(wikiRoot.get("id") , wikiId));

        return em.createQuery(cr).getSingleResult();
    }
}

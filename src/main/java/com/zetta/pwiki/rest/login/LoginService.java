package com.zetta.pwiki.rest.login;

import com.zetta.pwiki.rest.member.MemberDTO;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Service
public class LoginService {

    @PersistenceContext
    private EntityManager em;

    // 로그인할 유저의 아이디로 비밀번호를 조회해서 서로 일치하는지 확인.
    public boolean loginMember(MemberDTO memberDTO) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<MemberDTO> cr = cb.createQuery(MemberDTO.class);
        Root memberDTORoot = cr.from(MemberDTO.class);

        cr.select(memberDTORoot).where(cb.equal(memberDTORoot.get("email"), memberDTO.getEmail()));

        MemberDTO memberResult = em.createQuery(cr).getSingleResult();

        // 아이디에 해당하는 패스워드가 일치하면.
        if (memberResult != null && memberResult.getPassword().equals(memberDTO.getPassword())) {

            return true;
        }

        return false;
    }
}

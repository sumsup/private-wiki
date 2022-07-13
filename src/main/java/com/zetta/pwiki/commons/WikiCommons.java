package com.zetta.pwiki.commons;

import com.zetta.pwiki.rest.wiki.Wiki;
import com.zetta.pwiki.rest.wiki.WikiRepositoryInitializer;
import org.springframework.stereotype.Component;

@Component
public class WikiCommons {

    /**
     * static field에 멤버로 interpace를 넣을 수 없다.
     * static final -> 상수화. 상수화 멤버는 무조건 초기화를 해줘야 함. 안그러면 컴파일 에러.
     */
    private static WikiRepositoryInitializer wikiRepositoryInitializer;

    /**
     * static 멤버는 생성자로 생성할 때 아래와 같이 파라미터를 받아서 생성해야 함.
     * @param wikiRepositoryInitializer
     */
    public WikiCommons(WikiRepositoryInitializer wikiRepositoryInitializer) {
        this.wikiRepositoryInitializer = wikiRepositoryInitializer;
    }

    /**
     * 위키가 전체공개인지 확인. 전체공개면 true. 비공개면 false.
     */
    public static boolean isWikiPublic(Integer wikiId) {
        Wiki wiki = wikiRepositoryInitializer.findById(wikiId);

        if (wiki != null) {
            if (wiki.getIsPrivate()) {
                return false;
            } else {
                return true;
            }
        }

        return false;
    }

    /**
     * 위키 작성자가 일치 하는지 확인.
     */
    public static boolean isMatchWikiMaker(Integer wikiId, Integer creatorId) {
        Wiki wiki = wikiRepositoryInitializer.findById(wikiId);

        if (wiki != null) {
            if (wiki.getMember().getId() == creatorId) {
                return true;
            }
        }

        return false;
    }

}

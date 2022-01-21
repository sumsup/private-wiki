package com.zetta.pwiki.rest.wiki;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WikiRepository extends JpaRepository<WikiDTO, Integer> {

}

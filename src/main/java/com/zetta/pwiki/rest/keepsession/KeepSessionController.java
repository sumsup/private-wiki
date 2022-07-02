package com.zetta.pwiki.rest.keepsession;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class KeepSessionController {

    @GetMapping("/session")
    public void keepSession() {
        log.info("keep session API calling");
    }

}

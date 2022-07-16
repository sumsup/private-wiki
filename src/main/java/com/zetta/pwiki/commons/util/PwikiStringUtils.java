package com.zetta.pwiki.commons.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class PwikiStringUtils {

    public static boolean isNotEndsWith(CharSequence str, CharSequence suffix) {
        return !StringUtils.endsWith(str, suffix);
    }

}

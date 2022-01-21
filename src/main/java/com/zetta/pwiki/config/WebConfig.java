package com.zetta.pwiki.config;

import com.zetta.pwiki.infra.interceptor.page.PageWikiGetInterceptor;
import com.zetta.pwiki.infra.interceptor.page.PageWikiListInterceptor;
import com.zetta.pwiki.infra.interceptor.restapi.RestApiWikiGetInterceptor;
import com.zetta.pwiki.infra.interceptor.restapi.RestApiWikiUpdateOrDeleteInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.zetta.pwiki.infra.interceptor.restapi.commons.RestLoginCheckInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public RestApiWikiGetInterceptor restApiWikiGetInterceptor() {
        return new RestApiWikiGetInterceptor();
    }

    @Bean
    public RestLoginCheckInterceptor restLoginCheckInterceptor() {
        return new RestLoginCheckInterceptor();
    }

    @Bean
    public PageWikiListInterceptor pageWikiListInterceptor() {
        return new PageWikiListInterceptor();
    }

    @Bean
    public PageWikiGetInterceptor pageWikiGetInterceptor() {
        return new PageWikiGetInterceptor();
    }

    @Bean
    public RestApiWikiUpdateOrDeleteInterceptor restApiWikiUpdateOrDeleteInterceptor() {
        return new RestApiWikiUpdateOrDeleteInterceptor();
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/page/wiki/all-wiki-list.html");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(pageWikiListInterceptor())
                .addPathPatterns("/page/wiki/list");
//                .excludePathPatterns("/login", "/page/member/login", "/**/**/**.html", "/error"
//                        , "/js/**/**" ,"/css/**/**", "/favicon.ico", "/page/member/join");
//                .excludePathPatterns("/wiki/all");

        registry.addInterceptor(pageWikiGetInterceptor())
                .addPathPatterns("/page/wiki/get");

        registry.addInterceptor(restApiWikiGetInterceptor())
                .addPathPatterns("/wiki/get/**");

        registry.addInterceptor(restLoginCheckInterceptor())
                .addPathPatterns("/wiki/list");

        registry.addInterceptor(restApiWikiUpdateOrDeleteInterceptor())
                .addPathPatterns("/wiki/update/**", "/wiki/delete/**");

        registry.addInterceptor(restLoginCheckInterceptor())
                .addPathPatterns("/wiki/save");

    }

}

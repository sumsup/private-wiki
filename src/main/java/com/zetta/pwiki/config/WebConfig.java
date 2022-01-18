package com.zetta.pwiki.config;

import com.zetta.pwiki.infra.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Bean
    public LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/page/wiki/all-wiki-list.html");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor())
                .addPathPatterns("/page/wiki/**", "/wiki/**")
//                .excludePathPatterns("/login", "/page/member/login", "/**/**/**.html", "/error"
//                        , "/js/**/**" ,"/css/**/**", "/favicon.ico", "/page/member/join");
                .excludePathPatterns("/page/wiki/all", "/page/wiki/all-wiki-list.html", "/wiki/all");

    }

}

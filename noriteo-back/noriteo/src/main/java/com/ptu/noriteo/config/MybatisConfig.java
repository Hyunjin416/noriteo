package com.ptu.noriteo.config;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
@MapperScan(basePackages = "com.ptu.noriteo.mapper") // 매퍼 인터페이스 패키지 설정
public class MybatisConfig {

    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dataSource);

        // MyBatis 설정 파일을 로드 (mybatis-config.xml이 존재해야 함)
        sessionFactory.setConfigLocation(
                new org.springframework.core.io.ClassPathResource("mybatis-config.xml"));

        // 매퍼 XML 파일 위치 설정
        sessionFactory.setMapperLocations(
                new PathMatchingResourcePatternResolver().getResources("classpath:/mapper/*.xml"));

        return sessionFactory.getObject();
    }
}

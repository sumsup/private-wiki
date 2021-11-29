package com.zetta.pwiki.infra;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

@DataJpaTest
public class DBConnectionTest {

    @Autowired
    private DataSource dataSource;

    @Test
    public void connectionTest() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("connection test : " + connection.getCatalog());
        }
    }

}

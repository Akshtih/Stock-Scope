package com.stockscope;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StockscopeApplication {

    public static void main(String[] args) {
        SpringApplication.run(StockscopeApplication.class, args);
        System.out.println("\n===========================================");
        System.out.println("🚀 StockScope Backend is Running!");
        System.out.println("===========================================");
        System.out.println("📍 Server: http://localhost:8080");
        System.out.println("📍 API Base: http://localhost:8080/api");
        System.out.println("===========================================\n");
    }
}

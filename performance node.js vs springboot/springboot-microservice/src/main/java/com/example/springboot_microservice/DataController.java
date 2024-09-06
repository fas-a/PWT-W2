package com.example.springboot_microservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DataController {

    @GetMapping("/data")
    public String getData() {
        return "{\"message\": \"Hello from Spring Boot microservice!\"}";
    }

    @PostMapping("/data")
    public String postData(@RequestBody String data) {
        return "{\"received\": " + data + "}";
    }
}

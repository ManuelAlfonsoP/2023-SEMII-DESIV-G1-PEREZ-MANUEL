package com.lab11;

import static spark.Spark.*;

public class App {
    public static void main(String[] args){
        get("/hello", (request, response) -> "Hello World - Spark");
    }
}
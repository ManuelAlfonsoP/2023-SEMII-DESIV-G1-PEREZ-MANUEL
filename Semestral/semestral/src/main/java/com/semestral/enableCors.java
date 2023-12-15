package com.semestral;

import static spark.Spark.before;
import static spark.Spark.options;

class enableCors {
    public static void main(String[] args) {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null){
                response.header("Access-Contro-Allow-Headers", accessControlRequestHeaders);
            }

        String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    }
}
    

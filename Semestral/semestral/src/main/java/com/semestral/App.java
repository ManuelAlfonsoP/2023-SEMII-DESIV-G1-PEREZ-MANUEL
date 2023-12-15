package com.semestral;
import static spark.Spark.*;
import java.util.*;

import org.json.JSONObject;
public class App {
        public static void main(String[] args){
            enableCors.main(args);
            ArrayList<String> A = new ArrayList<>();
            post("/Add", (request, response) -> {
                String Texto = request.body();
                A.add(Texto);
                return "Done";
            });
            get("/Id/:index", (request, response) -> {
                int id = Integer.parseInt(request.params("index"));
                JSONObject json = new JSONObject();
                json.put("data", A.get(id));
                return json;
            });
            get("/All", (request, response) -> {
                JSONObject json = new JSONObject();
                json.put("data", A);
                return json;
            });
    }
}

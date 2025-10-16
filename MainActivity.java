package com.example.consumeapi;

import android.os.Bundle;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;


import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    TextView data;

    String uri;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        data = findViewById(R.id.texto);
        uri="https://jsonplaceholder.typicode.com/users/1";
        JsonObjectRequest request =new JsonObjectRequest(Request.Method.GET, uri, null, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject jsonObject) {
                try {
                    String name = jsonObject.getString("name");
                    data.setText(name);
                } catch (JSONException e) {}
            }
            }
            , new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError VolleyError) {
                    data.setText("Error");
                }

            });
            Volley.newRequestQueue(this).add(request);

    }
}
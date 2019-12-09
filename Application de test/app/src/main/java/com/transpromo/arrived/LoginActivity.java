package com.transpromo.arrived;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonToken;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class LoginActivity extends AppCompatActivity {

    Button inscription;
    Button connection_suivi;
    Button connection_suiveur;
    EditText mail;
    EditText mdp;
    String token;

    private final static String TAG = "LOGIN";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        inscription = findViewById(R.id.inscription);
        connection_suivi = findViewById(R.id.connection_suivi);
        connection_suiveur = findViewById(R.id.connection_suiveur);
        mdp = findViewById(R.id.mdp);
        mail = findViewById(R.id.mail);

        inscription.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

        connection_suivi.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(connect(mail.getText().toString(),mdp.getText().toString())){
                    startActivity(new Intent(getApplication(), SuiviActivity.class));
                }else{
                    Toast.makeText(getApplication(),"echec",Toast.LENGTH_LONG).show();
                }
            }
        });

        connection_suiveur.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (connect(mail.getText().toString(), mdp.getText().toString())) {
                    startActivity(new Intent(getApplication(), SuiveurActivity.class));
                } else {
                    Toast.makeText(getApplication(), "echec", Toast.LENGTH_LONG).show();
                }
            }
        });


    }

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    OkHttpClient client = new OkHttpClient();

    public boolean connect(String mail, String mdp){
        JSONObject connection = new JSONObject();
        try {
            connection.put("EmailAccount",mail);
            connection.put("PasswordAccount",mdp);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        try {
            String reponse = post("",connection.toString());
            Log.d(TAG, "connect: "+reponse);
            if(reponse!=null){
                token = reponse;
                return true;
            }else{
                return false;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }


    public String post(String url,String json) throws IOException{
        RequestBody body = RequestBody.create(JSON,json);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        Response reponse = client.newCall(request).execute();
        return reponse.body().string();
    }

}
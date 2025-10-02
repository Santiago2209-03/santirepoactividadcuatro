package com.example.calculadoraimc;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    EditText d_peso;
    EditText d_estatura;
    Button calcular;
    TextView resultado;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      EdgeToEdge.enable(this);
      setContentView(R.layout.activity_main);
      //Recuperar el vinculo con la interfaz
      d_peso = findViewById(R.id.peso);
      d_estatura = findViewById(R.id.estatura);
      calcular = findViewById(R.id.calcular);
      resultado = findViewById(R.id.res);

      // imc = peso / estatura^2

      calcular.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
          double peso = Double.parseDouble(d_peso.getText().toString());
          double estatura = Double.parseDouble(d_estatura.getText().toString());
          double imc = peso / Math.pow(estatura, 2);
          resultado.setText(String.valueOf(imc));

        }
      });
    }
}


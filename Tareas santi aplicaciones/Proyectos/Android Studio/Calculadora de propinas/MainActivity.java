package com.example.calculadoradepropinas;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

import com.example.calculadoradepropinas.R;

import java.text.DecimalFormat;

public class MainActivity extends AppCompatActivity {

  private EditText editTextAmount;
  private EditText editTextPeople;
  private RadioGroup radioGroupTip;
  private RadioButton radioButton0, radioButton5, radioButton10, radioButton15;
  private Button buttonCalculate;
  private TextView textViewTipAmount, textViewTotalAmount, textViewPerPerson;

  private DecimalFormat decimalFormat = new DecimalFormat("#.##");

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Inicializar los componentes de la interfaz
    initializeViews();

    // Configurar el listener del botón
    buttonCalculate.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        calculateTip();
      }
    });
  }

  private void initializeViews() {
    editTextAmount = findViewById(R.id.editTextAmount);
    editTextPeople = findViewById(R.id.editTextPeople);
    radioGroupTip = findViewById(R.id.radioGroupTip);
    radioButton0 = findViewById(R.id.radioButton0);
    radioButton5 = findViewById(R.id.radioButton5);
    radioButton10 = findViewById(R.id.radioButton10);
    radioButton15 = findViewById(R.id.radioButton15);
    buttonCalculate = findViewById(R.id.buttonCalculate);
    textViewTipAmount = findViewById(R.id.textViewTipAmount);
    textViewTotalAmount = findViewById(R.id.textViewTotalAmount);
    textViewPerPerson = findViewById(R.id.textViewPerPerson);
  }

  private void calculateTip() {
    // Obtener el monto de la cuenta
    String amountString = editTextAmount.getText().toString().trim();
    if (amountString.isEmpty()) {
      Toast.makeText(this, "Por favor ingresa el monto de la cuenta", Toast.LENGTH_SHORT).show();
      return;
    }

    double billAmount;
    try {
      billAmount = Double.parseDouble(amountString);
      if (billAmount < 0) {
        Toast.makeText(this, "El monto debe ser positivo", Toast.LENGTH_SHORT).show();
        return;
      }
    } catch (NumberFormatException e) {
      Toast.makeText(this, "Por favor ingresa un monto válido", Toast.LENGTH_SHORT).show();
      return;
    }

    // Obtener el número de personas
    String peopleString = editTextPeople.getText().toString().trim();
    int numberOfPeople = 1; // Valor por defecto

    if (!peopleString.isEmpty()) {
      try {
        numberOfPeople = Integer.parseInt(peopleString);
        if (numberOfPeople <= 0) {
          Toast.makeText(this, "El número de personas debe ser mayor a 0", Toast.LENGTH_SHORT).show();
          return;
        }
      } catch (NumberFormatException e) {
        Toast.makeText(this, "Por favor ingresa un número válido de personas", Toast.LENGTH_SHORT).show();
        return;
      }
    }

    // Obtener el porcentaje de propina seleccionado
    double tipPercentage = getTipPercentage();

    // Realizar los cálculos
    double tipAmount = billAmount * (tipPercentage / 100);
    double totalAmount = billAmount + tipAmount;
    double amountPerPerson = totalAmount / numberOfPeople;

    // Mostrar los resultados
    displayResults(tipAmount, totalAmount, amountPerPerson);
  }

  private double getTipPercentage() {
    int selectedId = radioGroupTip.getCheckedRadioButtonId();

    if (selectedId == R.id.radioButton0) {
      return 0.0;
    } else if (selectedId == R.id.radioButton5) {
      return 5.0;
    } else if (selectedId == R.id.radioButton10) {
      return 10.0;
    } else if (selectedId == R.id.radioButton15) {
      return 15.0;
    } else {
      return 10.0; // Valor por defecto
    }
  }

  private void displayResults(double tipAmount, double totalAmount, double amountPerPerson) {
    String tipText = "Propina: $" + decimalFormat.format(tipAmount);
    String totalText = "Total a pagar: $" + decimalFormat.format(totalAmount);
    String perPersonText = "Por persona: $" + decimalFormat.format(amountPerPerson);

    textViewTipAmount.setText(tipText);
    textViewTotalAmount.setText(totalText);
    textViewPerPerson.setText(perPersonText);
  }
}

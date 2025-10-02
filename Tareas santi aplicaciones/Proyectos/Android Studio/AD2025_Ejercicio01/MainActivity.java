package com.example.ad2025_ejercicio01;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

  private EditText etUsername;
  private EditText etPassword;
  private TextView tvAccessGranted;
  private TextView tvAccessDenied;
  private Button btnLogin;
  private Button btnCancel;

  private static final String VALID_USERNAME = "admin";
  private static final String VALID_PASSWORD = "1234";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    etUsername = findViewById(R.id.etUsername);
    etPassword = findViewById(R.id.etPassword);
    tvAccessGranted = findViewById(R.id.tvAccessGranted);
    tvAccessDenied = findViewById(R.id.tvAccessDenied);
    btnLogin = findViewById(R.id.btnLogin);
    btnCancel = findViewById(R.id.btnCancel);

    btnLogin.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        performLogin();
      }
    });

    btnCancel.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        clearFields();
      }
    });
  }

  private void performLogin() {
    String username = etUsername.getText().toString().trim();
    String password = etPassword.getText().toString().trim();

    if (username.isEmpty() || password.isEmpty()) {
      hideAllMessages();
      return;
    }

    if (username.equalsIgnoreCase(VALID_USERNAME) && password.equals(VALID_PASSWORD)) {
      showAccessGranted();
    } else {
      showAccessDenied();
    }
  }

  private void showAccessGranted() {
    tvAccessGranted.setVisibility(View.VISIBLE);
    tvAccessDenied.setVisibility(View.GONE);
  }

  private void showAccessDenied() {
    tvAccessDenied.setVisibility(View.VISIBLE);
    tvAccessGranted.setVisibility(View.GONE);
  }

  private void hideAllMessages() {
    tvAccessGranted.setVisibility(View.GONE);
    tvAccessDenied.setVisibility(View.GONE);
  }

  private void clearFields() {
    etUsername.setText("");
    etPassword.setText("");
    hideAllMessages();
  }

  private boolean validateCredentials(String username, String password) {
    return username.equalsIgnoreCase(VALID_USERNAME) && password.equals(VALID_PASSWORD);
  }

  @Override
  protected void onPause() {
    super.onPause();
  }

  @Override
  protected void onResume() {
    super.onResume();
    hideAllMessages();
  }
}

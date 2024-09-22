// Firebase SDK initialization
// TODO: Add SDKs for Firebase products as needed
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration for ESP32 IoT app
const firebaseConfig = {
  apiKey: "AIzaSyBrlcOatp3I36lMei6RWBQ-nD2kFJGNEbI",
  authDomain: "esp32iot-3bcaf.firebaseapp.com",
  databaseURL: "https://esp32iot-3bcaf-default-rtdb.firebaseio.com",
  projectId: "esp32iot-3bcaf",
  storageBucket: "esp32iot-3bcaf.appspot.com",
  messagingSenderId: "111583222387",
  appId: "1:111583222387:web:749c372c0f616d0baf6806"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase database reference
var dbRef = firebase.database();
var GPIO = 0;
var ADC = 0;

var Temperatura = 0;
var Presion = 0;
var Altitud = 0;

// Retrieve Temperature value from Firebase and update the webpage
let dbTemperatura = dbRef.ref("ESP32IoTApp/Temperatura/");
dbTemperatura.on('value', function(snapshot) {
  Temperatura = snapshot.val();
  document.getElementById("TemperaturaId").innerHTML = "Temperatura = " + Temperatura + " °C";
  console.log("El valor de la Temperatura es", Temperatura);
});

// Retrieve Pressure value from Firebase and update the webpage
let dbPresion = dbRef.ref("ESP32IoTApp/Presion/");
dbPresion.on('value', function(snapshot) {
  Presion = snapshot.val();
  document.getElementById("PresionId").innerHTML = "Presion = " + Presion + " mmHg";
  console.log("El valor de la Presion es", Presion);
});

// Retrieve Altitude value from Firebase and update the webpage
let dbAltitud = dbRef.ref("ESP32IoTApp/Altitud/");
dbAltitud.on('value', function(snapshot) {
  Altitud = snapshot.val();
  document.getElementById("AltitudId").innerHTML = "Altitud = " + Altitud + " m";
  console.log("El valor de la Altitud es", Altitud);
});

// Retrieve Humidity value from Firebase and update the webpage
let dbHumedad = dbRef.ref("ESP32IoTApp/Humedad/");
dbHumedad.on('value', function(snapshot) {
  Humedad = snapshot.val();
  document.getElementById("HumedadId").innerHTML = "Humedad = " + Humedad + " %";
  console.log("El valor de la Humedad es", Humedad);
});

// Retrieve GPIO value from Firebase and update the webpage
let dbGPIO = dbRef.ref("ESP32IoTApp/GPIO/");
dbGPIO.on('value', function(snapshot) {
  GPIO = snapshot.val();
  document.getElementById("GPIO_0_Id").innerHTML = "GPIO = " + GPIO;
  console.log("El valor del GPIO es", GPIO);
});

// Retrieve ADC value from Firebase and update the webpage
let dbADC = dbRef.ref("ESP32IoTApp/ADC/");
dbADC.on('value', function(snapshot) {
  ADC = snapshot.val();
  document.getElementById("ADCId").innerHTML = "ADC = " + ADC;
  console.log("El valor del ADC es", ADC);
});

// Reference for the LED control status in Firebase
let dbLedStatus = dbRef.ref("ESP32IoTApp/LedControl/estado");

$(document).ready(function() {
  // Handle button click for LED on/off control
  $("#toggleBtn").click(function() {
    var estadoActual = $(this).text();
    var nuevoEstado = (estadoActual === "Encendido") ? "Apagado" : "Encendido";
    $(this).text(nuevoEstado);

    // Send new state to Firebase
    enviarEstado(nuevoEstado);
  });

  // Function to send LED state to Firebase
  function enviarEstado(estado) {
    console.log("Nuevo estado enviado: " + estado);
    dbLedStatus.set(estado);
  }
});

// Reference for DAC control in Firebase
let dbDAC = dbRef.ref("ESP32IoTApp/DAC/");

// Capture DAC input value and send to Firebase
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('capturarBtnDAC').addEventListener('click', function() {
    var numeroCapturado = document.getElementById('InputDAC').value;

    // Check if the input is a valid number
    if (!isNaN(numeroCapturado)) {
      console.log("Número capturado: " + numeroCapturado);
      dbDAC.set(numeroCapturado);
    } else {
      console.log("Por favor, ingresa un número válido.");
    }
  });
});

// Reference for LED RGB color control in Firebase
let dbLedRGB = dbRef.ref("ESP32IoTApp/LedRGB/color");

$(document).ready(function() {
  // Handle the color change for the LED RGB
  $("#guardarColor").click(function() {
    var color = $("input[name='gridRadios']:checked").val();
    console.log("Color seleccionado: " + color);

    // Send the selected color to Firebase
    dbLedRGB.set(color);
  });
});
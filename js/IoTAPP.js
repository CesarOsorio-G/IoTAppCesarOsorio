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

var Temperatura = 0;
var Presion = 0;
var Altitud = 0;
var Humedad = 0;

// Retrieve Temperature value from Firebase and update the webpage
let dbTemperatura = dbRef.ref("ESP32IoTApp/Temperatura/");
dbTemperatura.on('value', function(snapshot) {
  Temperatura = snapshot.val();
  document.getElementById("TemperaturaId").innerHTML = Temperatura + " °C";
  console.log("El valor de la Temperatura es", Temperatura);
});

// Retrieve Pressure value from Firebase and update the webpage
let dbPresion = dbRef.ref("ESP32IoTApp/Presion/");
dbPresion.on('value', function(snapshot) {
  Presion = snapshot.val();
  document.getElementById("PresionId").innerHTML = Presion + " mmHg";
  console.log("El valor de la Presion es", Presion);
});

// Retrieve Altitude value from Firebase and update the webpage
let dbAltitud = dbRef.ref("ESP32IoTApp/Altitud/");
dbAltitud.on('value', function(snapshot) {
  Altitud = snapshot.val();
  document.getElementById("AltitudId").innerHTML = Altitud + " m";
  console.log("El valor de la Altitud es", Altitud);
});

// Retrieve Humidity value from Firebase and update the webpage
let dbHumedad = dbRef.ref("ESP32IoTApp/Humedad/");
dbHumedad.on('value', function(snapshot) {
  Humedad = snapshot.val();
  document.getElementById("HumedadId").innerHTML = Humedad + " %";
  console.log("El valor de la Humedad es", Humedad);
});
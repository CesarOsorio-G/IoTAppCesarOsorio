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

//Sensor de Movimiento
let dbMotionSensor = dbRef.ref("ESP32IoTApp/SensorControl/estado");

$(document).ready(function() {
  $("#switchMovimiento").change(function() {
    if ($(this).is(':checked')) {
      // Switch is ON
      dbMotionSensor.set("Encendido");
      console.log("Sensor de movimiento: Encendido");
    } else {
      // Switch is OFF
      dbMotionSensor.set("Apagado");
      console.log("Sensor de movimiento: Apagado");
    }
  });
});


//Reproducir Sonido o Uso de Microfono
let dbMusicControl = dbRef.ref("ESP32IoTApp/MusicaControl/estado");

$(document).ready(function() {
  $("#switchMusicaMic").change(function() {
    if ($(this).is(':checked')) {
      // Switch is ON
      dbMusicControl.set("Música");
      console.log("Estado de reproduccion: Música");
    } else {
      // Switch is OFF
      dbMusicControl.set("Micrófono");
      console.log("Estado de reproduccion: Micrófono");
    }
  });
});
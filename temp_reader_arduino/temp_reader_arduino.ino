#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN 2
#define DHTTYPE    DHT11

DHT_Unified dht(DHTPIN, DHTTYPE);

const uint32_t delaySeconds = 5;

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // Delay between measurements.
  delay(delaySeconds * 1000);

  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println("Error reading temperature!");
  } else {
    Serial.println(event.temperature);
  }
}
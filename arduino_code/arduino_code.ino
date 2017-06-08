/*
  Repeating Web client

 This sketch connects to a a web server and makes a request
 using a Wiznet Ethernet shield. You can use the Arduino Ethernet shield, or
 the Adafruit Ethernet shield, either one will work, as long as it's got
 a Wiznet Ethernet module on board.

 This example uses DNS, by assigning the Ethernet client with a MAC address,
 IP address, and DNS address.

 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13

 created 19 Apr 2012
 by Tom Igoe
 modified 21 Jan 2014
 by Federico Vanzati

 http://www.arduino.cc/en/Tutorial/WebClientRepeating
 This code is in the public domain.

 */

#include <SPI.h>
#include <Ethernet.h>

// ----------------------------------------- Config Sensor
// which pin to use for reading the sensor? can use any pin!
#define FLOWSENSORPIN 2

// Timer to send the data and reset
volatile uint8_t timer = 0;
// count how many pulses!
volatile uint16_t pulses = 0;
// track the state of the pulse pin
volatile uint8_t lastflowpinstate;
// you can try to keep time of how long it is between pulses
volatile uint32_t lastflowratetimer = 0;
// and use that to calculate a flow rate
volatile float flowrate;
// Interrupt is called once a millisecond, looks for any pulses from the sensor!
SIGNAL(TIMER0_COMPA_vect) {
  uint8_t x = digitalRead(FLOWSENSORPIN);
  
  if (x == lastflowpinstate) {
    lastflowratetimer++;
    return; // nothing changed!
  }
  
  if (x == HIGH) {
    //low to high transition!
    pulses++;
  }
  lastflowpinstate = x;
  flowrate = 1000.0;
  flowrate /= lastflowratetimer;  // in hertz
  lastflowratetimer = 0;
}

void useInterrupt(boolean v) {
  if (v) {
    // Timer0 is already used for millis() - we'll just interrupt somewhere
    // in the middle and call the "Compare A" function above
    OCR0A = 0xAF;
    TIMSK0 |= _BV(OCIE0A);
  } else {
    // do not call the interrupt function COMPA anymore
    TIMSK0 &= ~_BV(OCIE0A);
  }
}


// ------------------------------------------ Config HTTP Server
// Quantidade lida
double quantidade = 0;
double quantidadeToSend = 0;
// Serial desse sensor
String serial = "MDC00001";

// assign a MAC address for the ethernet controller.
// fill in your address here:
byte mac[] = { 0x90, 0xA2, 0xDA, 0x0F, 0x81, 0x92 };
//char server[] = "192.168.0.20";
char server[] = "192.168.2.1";

// Set the static IP address to use if the DHCP fails to assign
IPAddress ip(192, 168, 0, 21);

// initialize the library instance:
EthernetClient client;

unsigned long lastConnectionTime = 0;             // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 10L * 1000L; // delay between updates, in milliseconds
// the "L" is needed to use long type numbers

void setup() {
  // start serial port:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  pinMode(FLOWSENSORPIN, INPUT);
  digitalWrite(FLOWSENSORPIN, HIGH);
  lastflowpinstate = digitalRead(FLOWSENSORPIN);
  useInterrupt(true);

  // give the ethernet module time to boot up:
  delay(1000);
  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // try to congifure using IP address instead of DHCP:
    Ethernet.begin(mac, ip);
  }
  // print the Ethernet board/shield's IP address:
  Serial.print("My IP address: ");
  Serial.println(Ethernet.localIP());
}

void loop() {
  // if there's incoming data from the net connection.
  // send it out the serial port.  This is for debugging
  // purposes only:
  if (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  // if ten seconds have passed since your last connection,
  // then connect again and send data:
  if (millis() - lastConnectionTime > postingInterval) {
    calculaQuantidadeLida();
    httpRequest();
  }
}

// this method makes a HTTP connection to the server:
void httpRequest() {
  // close any connection before send a new request.
  // This will free the socket on the WiFi shield
  client.stop();

  // if there's a successful connection:
  if (client.connect(server, 3000)) {
    String quantidadeString = getQuantityFormatedToSend();
    Serial.println("connecting...");
    // send the HTTP GET request:
    client.println(String("GET /consumo/" + quantidadeString + "/sensor/" + serial + " HTTP/1.1"));
    //client.println("User-Agent: arduino-ethernet");
    client.println("Connection: close");
    client.println();

    // note the time that the connection was made:
    lastConnectionTime = millis();
    timer = 0;
    pulses = 0;
    quantidadeToSend = 0;
    //Serial.flush();
  } else {
    // if you couldn't make a connection:
    Serial.println("connection failed");
  }
}

String getQuantityFormatedToSend() {
  String quantidadeString = String(quantidadeToSend);
  quantidadeString.replace(".", "_");
  return quantidadeString;
}

void calculaQuantidadeLida() {
  Serial.print("Freq: "); Serial.println(flowrate);
  Serial.print("Pulses: "); Serial.println(pulses, DEC);
  
  // if a plastic sensor use the following calculation
  // Sensor Frequency (Hz) = 7.5 * Q (Liters/min)
  // Liters = Q * time elapsed (seconds) / 60 (seconds/minute)
  // Liters = (Frequency (Pulses/second) / 7.5) * time elapsed (seconds) / 60
  // Liters = Pulses / (7.5 * 60)
  quantidade = pulses;
  quantidade /= 5.5;
  quantidade /= 60.0;
  quantidadeToSend += quantidade;
  quantidade = 0;
  timer += 1;

  /*
    // if a brass sensor use the following calculation
    float liters = pulses;
    liters /= 8.1;
    liters -= 6;
    liters /= 60.0;
  */
  Serial.print(quantidadeToSend); Serial.println(" Liters");
  Serial.print("Contador: "); Serial.println(timer);
}


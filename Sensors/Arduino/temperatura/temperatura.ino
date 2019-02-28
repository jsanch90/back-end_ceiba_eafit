int analogPin = 0;

float val = 0;

void setup()

{

  Serial.begin(9600);          //  setup serial

}


void loop()

{

  val = analogRead(analogPin);    // read the input pin
  val = val-521.0; // 541 = 1,72V = 20°C --> 551 = 1,75V = 30°C
  delay(1);
  Serial.println("Value:");
  delay(500);
  Serial.print((int)val);// debug value
  Serial.print("°C");
  Serial.println();

}

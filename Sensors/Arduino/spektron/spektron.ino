int analogPin = 0;

float val = 0;           // variable to store the value read

float amp_gain = 51;

float input_v = 3.3;

float sensor_value = 0;

void setup(){
  Serial.begin(9600);          //  setup serial
}


void loop()

{

  sensor_value = (((float)analogRead(analogPin)*input_v)/1024.0)/amp_gain;    // read the input pin
  val = (sensor_value*1000.0)/0.075;
  delay(1);
  Serial.println("Value:");
  delay(500);
  Serial.print(val);// debug value
  Serial.print(" W/m²");
  Serial.println();

}

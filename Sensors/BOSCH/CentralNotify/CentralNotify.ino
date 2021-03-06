



#include <CurieBLE.h>
//Enable debug to be able to print in arduino IDE 
bool debug = true;
//bool enableXbee=true;


//int generationCurrent;
//int consumptionCurrent; 
//int batteryVoltage;
unsigned char data2[20] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};

void setup() {
Serial.begin(9600);
//if(enableXbee){
  Serial1.begin(9600);
//}

BLE.begin();
Serial.println("BLE Central - XDK control");
BLE.scan();
}

void loop() {
  delay(2000);
  Serial.println("#######################################");
  BLEDevice peripheral = BLE.available();
  if (peripheral) {
      // discovered a peripheral, print out address, local name, and advertised service
      Serial.print("Found ");
      Serial.print(peripheral.address());
      Serial.print(" '");
      Serial.println(peripheral.localName());

      if (peripheral.localName() == "BCDS_Virtual_Sensor") {
        BLE.stopScan();
        peripheral.connect();
        peripheral.poll();
        if(peripheral.discoverAttributesByService("55b741d0-7ada-11e4-82f8-0800200c9a66")){
          Serial.println("Atributes discovered");
          Serial.println(peripheral.deviceName());
          Serial.println("----------------------");
          }
          

        delay(2000);

        
        BLEService XDKControlService = peripheral.service("55b741d0-7ada-11e4-82f8-0800200c9a66");
        BLECharacteristic XDKSensorHighRate= XDKControlService.characteristic("55b741d1-7ada-11e4-82f8-0800200c9a66");
        BLECharacteristic XDKsensorFusion = XDKControlService.characteristic("55b741d5-7ada-11e4-82f8-0800200c9a66");
          // Turn off fusion Sensor
        XDKsensorFusion.writeByte(0x00);
        //Turn on DataStreaming
        XDKSensorHighRate.writeByte(0x01);
          
        
        Serial.print("NewService Count: ");
        Serial.println(peripheral.serviceCount());
        }

        if (peripheral.discoverAttributesByService("c2967210-7ba4-11e4-82f8-0800200c9a66")) {
            Serial.println("Attributes discovered");
          } else {
            Serial.println("Attribute discovery failed!");

          }
          if(peripheral.connected()){Serial.println("Device connected!!!");}
        while (peripheral.connected()){
          delay(20);
          BLEService HighPrioDataService = peripheral.service("c2967210-7ba4-11e4-82f8-0800200c9a66");
          exploreService(HighPrioDataService);
          explorePowerSensors();
          }        
        }
        else{
          explorePowerSensors();
          } 
      
}

void explorePowerSensors(){
  //generationCurrent = analogRead(0);
  //consumptionCurrent = analogRead(1);
  //batteryVoltage = analogRead(2);
  /**
  data2[0] = (uint8_t) generationCurrent;
  data2[1] = (uint8_t) (generationCurrent >> 8);
  data2[2] = (uint8_t) consumptionCurrent;
  data2[3] = (uint8_t) (consumptionCurrent >> 8);
  data2[4] = (uint8_t) batteryVoltage;
  data2[5] = (uint8_t) (batteryVoltage >> 8);

  if (debug){
    for (int i = 0 ; i < 20; i++){
      Serial.print(data2[i]);
      Serial.print(" ");
      }
      Serial.println();
    }
  Serial1.write(data2, 20);
  Serial1.print('C');
  */
}


void exploreService(BLEService service) {
  // print the UUID of the service
  if(debug){
    Serial.print("Service ");
    Serial.println(service.uuid());
    }

   BLECharacteristic HighPrioChar = service.characteristic("c2967211-7ba4-11e4-82f8-0800200c9a66");
   BLECharacteristic LowPrioChar = service.characteristic("c2967212-7ba4-11e4-82f8-0800200c9a66");
   //Serial1.write('q');

    exploreHighCharacteristic(HighPrioChar);
    exploreLowCharacteristic(LowPrioChar);   
}


void exploreHighCharacteristic(BLECharacteristic characteristic) {
  // print the UUID and properies of the characteristic
  if (debug){
    Serial.print("\tCharacteristic ");
    Serial.print(characteristic.uuid());
    Serial.print(", properties 0x");
    Serial.print(characteristic.properties());
    }

  if (characteristic.canRead()) {
    
    characteristic.read();
    
    if (characteristic.valueLength() > 0)
    {
      printHighPrioData(characteristic.value(), characteristic.valueLength());        
      }
   }
}

void exploreLowCharacteristic(BLECharacteristic characteristic) {
  // print the UUID and properies of the characteristic
  if (debug){
    Serial.print("\tCharacteristic ");
    Serial.print(characteristic.uuid());
    Serial.print(", properties 0x");
    Serial.print(characteristic.properties());
    }
  // check if the characteristic is readable
  if (characteristic.canRead()) {
    characteristic.read();  
    if (characteristic.valueLength() > 0)
    {
      printLowPrioData(characteristic.value(), characteristic.valueLength());        
      }
   }
}

void printHighPrioData(const unsigned char data[], int length) {
  if (debug){
    Serial.print(", value: ");
    for (int i = 0; i < length; i++) {
      unsigned char b = data[i];
  
      Serial.print(b);
      Serial.print(",");
    }
    Serial.println();

   
    long accX = (byte(data[1]) << 8) | byte(data[0]);
    long accY = (byte(data[3]) << 8) | byte(data[2]);
    long accZ = (byte(data[5]) << 8) | byte(data[4]);
    if (accX > 32768){accX = accX - 65535;}
    if (accY> 32768){accY = accY - 65535;}
    if (accZ> 32768){accZ = accZ - 65535;}
    
    
    int gyroX = (byte(data[7]) << 8) | byte(data[6]);
    int gyroY = (byte(data[9]) << 8) | byte(data[8]);
    int gyroZ = (byte(data[11]) << 8) | byte(data[10]);
    if (gyroX > 32768){gyroX = gyroX - 65535;}
    if (gyroY > 32768){gyroY = gyroY - 65535;}
    if (gyroZ > 32768){gyroZ = gyroZ - 65535;}

    
    Serial.print("Accelerometer X --> ");
    Serial.println(accX);
    Serial.print("Accelerometer Y --> ");
    Serial.println(accY);
    Serial.print("Accelerometer Z --> ");
    Serial.println(accZ);
    Serial.print("Gyro X --> ");
    Serial.println(gyroX);
    Serial.print("Gyro Y --> ");
    Serial.println(gyroY);
    Serial.print("Gyro Z --> ");
    Serial.println(gyroZ);      
    }
    //if (enableXbee){
     //Serial1.println("High");
     
      //Serial1.print(length-1);
      //data[19]=1;
      Serial1.write(data,length);
      Serial1.print('H');
      /*
      for(int i = 0; i < length; i++) {
        Serial1.print(data[i]);
        }
      Serial1.print('\n');*/
    //}
  }

void printLowPrioData(const unsigned char data[], int length) {
  if (debug){
    
    Serial.print(", value: ");

    if (int(data[0]) == 1){
      Serial.print("Message 1: ");
      for (int i = 0; i < length; i++) {
        unsigned char b = data[i];
        Serial.print(b);
        Serial.print(",");
      }
      Serial.println();
      long lightSensor = (byte(data[4]) << 24) | (byte(data[3]) << 16) |(byte(data[2]) << 8) | byte(data[1]);
      long noise =  byte(data[5]);
      long airPress = (byte(data[9]) << 24) | (byte(data[8]) << 16) |(byte(data[7]) << 8) | byte(data[6]);
      long temp = (byte(data[13]) << 24) | (byte(data[12]) << 16) |(byte(data[11]) << 8) | byte(data[10]);
      long humidity = (byte(data[17]) << 24) | (byte(data[16]) << 16) |(byte(data[15]) << 8) | byte(data[14]);
      
      Serial.print("Light Sensor --> ");
      Serial.println(lightSensor);
      Serial.print("Noise Sensor --> ");
      Serial.println(noise);
      Serial.print("Atmospheric Pressure --> ");
      Serial.println(airPress);
      Serial.print("Temperature --> ");
      Serial.println(temp);
      Serial.print("Humidity --> ");
      Serial.println(humidity);
    
    }
    else {
      Serial.print("Message 2: ");
      for (int i = 0; i < length; i++) {
        unsigned char b = data[i];
        Serial.print(b);
        Serial.print(",");
      }
      Serial.println();
      long magnX = (byte(data[2]) << 8) | byte(data[1]);
      long magnY=  (byte(data[4]) << 8) | byte(data[3]);
      long magnZ = (byte(data[6]) << 8) | byte(data[5]);
      long magnRes = (byte(data[8]) << 8) | byte(data[7]);
      
      
      Serial.print("Magnetometer X --> ");
      Serial.println(magnX);
      Serial.print("Magnetometer Y --> ");
      Serial.println(magnY);
      Serial.print("Magnetometer Z --> ");
      Serial.println(magnZ);
      Serial.print("Magnetometer Z --> ");
      Serial.println(magnZ);
      Serial.print("Magnetometer Resistance: ");
      Serial.println(magnRes);

      }
    }
    //if (enableXbee){
    //Serial1.println("Low");
  //  Serial1.write('\n');
      //data[19]= 2;
     Serial1.write(data, length);
    Serial1.print('L');

    //} 
}

  

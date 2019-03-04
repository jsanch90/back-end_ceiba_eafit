#include <CurieBLE.h>
//Enable debug to be able to print in arduino IDE
bool debug = true;
long h_priority_time = 5000;
long l_priority_time = 15000;
long last_time_h = 0;
long last_time_l = 0;

unsigned char data2[20] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0};

void setup()
{
    Serial.begin(9600);
    Serial1.begin(9600);

    BLE.begin();
    BLE.scan();
}

void loop()
{
    delay(2000);
    BLEDevice peripheral = BLE.available();
    if (peripheral)
    {

        if (peripheral.localName() == "BCDS_Virtual_Sensor")
        {
            BLE.stopScan();
            peripheral.connect();
            peripheral.poll();
            if (peripheral.discoverAttributesByService("55b741d0-7ada-11e4-82f8-0800200c9a66"))
            {}

            delay(2000);

            BLEService XDKControlService = peripheral.service("55b741d0-7ada-11e4-82f8-0800200c9a66");
            BLECharacteristic XDKSensorHighRate = XDKControlService.characteristic("55b741d1-7ada-11e4-82f8-0800200c9a66");
            BLECharacteristic XDKsensorFusion = XDKControlService.characteristic("55b741d5-7ada-11e4-82f8-0800200c9a66");
            // Turn off fusion Sensor
            XDKsensorFusion.writeByte(0x00);
            //Turn on DataStreaming
            XDKSensorHighRate.writeByte(0x01);

        }

        if (peripheral.discoverAttributesByService("c2967210-7ba4-11e4-82f8-0800200c9a66")){}
        else{}
        
        while (peripheral.connected())
        {
            delay(20);
            BLEService HighPrioDataService = peripheral.service("c2967210-7ba4-11e4-82f8-0800200c9a66");
            BLECharacteristic HighPrioChar = HighPrioDataService.characteristic("c2967211-7ba4-11e4-82f8-0800200c9a66");
            BLECharacteristic LowPrioChar = HighPrioDataService.characteristic("c2967212-7ba4-11e4-82f8-0800200c9a66");

            if (HighPrioChar.canRead())
            {

                HighPrioChar.read();

                if (HighPrioChar.valueLength() > 0)
                {
                  if((millis() - last_time_h) >= h_priority_time){
                    printHighPrioData(HighPrioChar.value(), HighPrioChar.valueLength());
                    last_time_h = millis();
                  }
                }
            }

            if (LowPrioChar.canRead())
            {
                LowPrioChar.read();
                if (LowPrioChar.valueLength() > 0)
                {
                  if((millis() - last_time_l) >= l_priority_time){
                    printLowPrioData(LowPrioChar.value(), LowPrioChar.valueLength());
                    last_time_l = millis();
                  }
                }
            }
        }
    }
}

void printHighPrioData(const unsigned char data[], int length)
{
    if (debug)
    {
        long accX = (byte(data[1]) << 8) | byte(data[0]);
        long accY = (byte(data[3]) << 8) | byte(data[2]);
        long accZ = (byte(data[5]) << 8) | byte(data[4]);
        if (accX > 32768)
        {
            accX = accX - 65535;
        }
        if (accY > 32768)
        {
            accY = accY - 65535;
        }
        if (accZ > 32768)
        {
            accZ = accZ - 65535;
        }

        int gyroX = (byte(data[7]) << 8) | byte(data[6]);
        int gyroY = (byte(data[9]) << 8) | byte(data[8]);
        int gyroZ = (byte(data[11]) << 8) | byte(data[10]);
        if (gyroX > 32768)
        {
            gyroX = gyroX - 65535;
        }
        if (gyroY > 32768)
        {
            gyroY = gyroY - 65535;
        }
        if (gyroZ > 32768)
        {
            gyroZ = gyroZ - 65535;
        }

        Serial.print("XDK_AX;");
        Serial.print("XDK_AY;");
        Serial.print("XDK_AZ;");
        Serial.print("XDK_GX;");
        Serial.print("XDK_GY;");
        Serial.print("XDK_GZ,");
        Serial.print(accX);
        Serial.print(";");
        Serial.print(accY);
        Serial.print(";");
        Serial.print(accZ);
        Serial.print(";");
        Serial.print(gyroX);
        Serial.print(";");
        Serial.print(gyroY);
        Serial.print(";");
        Serial.print(gyroZ);
        Serial.println();
    }

}

void printLowPrioData(const unsigned char data[], int length)
{
    if (debug)
    {

        if (int(data[0]) == 1)
        {
            long lightSensor = (byte(data[4]) << 24) | (byte(data[3]) << 16) | (byte(data[2]) << 8) | byte(data[1]);
            long noise = byte(data[5]);
            long airPress = (byte(data[9]) << 24) | (byte(data[8]) << 16) | (byte(data[7]) << 8) | byte(data[6]);
            long temp = (byte(data[13]) << 24) | (byte(data[12]) << 16) | (byte(data[11]) << 8) | byte(data[10]);
            long humidity = (byte(data[17]) << 24) | (byte(data[16]) << 16) | (byte(data[15]) << 8) | byte(data[14]);

            Serial.print("XDK_L;");
            Serial.print("XDK_N;");
            Serial.print("XDK_A;");
            Serial.print("XDK_T;");
            Serial.print("XDK_H,");
            Serial.print(lightSensor);
            Serial.print(";");
            Serial.print(noise);
            Serial.print(";");
            Serial.print(airPress);
            Serial.print(";");
            Serial.print(temp);
            Serial.print(";");
            Serial.print(humidity);
            Serial.println();
        }
        else
        {

            long magnX = (byte(data[2]) << 8) | byte(data[1]);
            long magnY = (byte(data[4]) << 8) | byte(data[3]);
            long magnZ = (byte(data[6]) << 8) | byte(data[5]);
            long magnRes = (byte(data[8]) << 8) | byte(data[7]);

            Serial.print("XDK_MX;");
            Serial.print("XDK_MY;");
            Serial.print("XDK_MZ;");
            Serial.print("XDK_MRes,");
            Serial.print(magnX);
            Serial.print(";");
            Serial.print(magnY);
            Serial.print(";");
            Serial.print(magnZ);
            Serial.print(";");
            Serial.print(magnRes);
            Serial.println();
        }
    }
}

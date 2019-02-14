#!/usr/bin/env python
from pymodbus.constants import Defaults
from pymodbus.constants import Endian
from pymodbus.client.sync import ModbusTcpClient as ModbusClient
from pymodbus.payload import BinaryPayloadDecoder
from influxdb import InfluxDBClient

Defaults.Timeout = 25
Defaults.Retries = 5
client = ModbusClient('169.254.094.238', port='502')
result = client.read_input_registers(261, 1, unit=243)
decoder = BinaryPayloadDecoder.fromRegisters(result.registers, endian=Endian.Big)
value=decoder.decode_16bit_int()
current = value/10.0

dbname = 'the name of your influxdb here'
dbuser = 'influxdb username'
dbuser_password = 'influxdb password'
sensor = "batamp"
json_body = [
        {
            "measurement": "current",
            "tags": {
               "sensor": sensor
            },
            "fields": {
               "value": current 
           }
        }
    ]

client = InfluxDBClient('the ip address of the machine influxdb is running on', '8086', dbuser, dbuser_password, dbname)
client.write_points(json_body)

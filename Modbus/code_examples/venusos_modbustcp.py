#!/usr/bin/python

from pymodbus.client.sync import ModbusTcpClient as ModbusClient
from pymodbus.payload import BinaryPayloadDecoder
from pymodbus.constants import Endian

import os,sys
import traceback
import syslog

MIN_SIGNED   =  -2147483648
MAX_UNSIGNED =  4294967295
VENUSOS_IP = '<IP-ADDRESS-OF-YOUR-VENUSGX-SYSTEM'

# From the MultiPlus
MODBUS_MP_B_V       = [100, 840, 1, 'uint16', 10]
MODBUS_MP_B_A       = [100, 841, 1, 'int16', 10]
MODBUS_MP_B_SOC = [100, 843, 1, 'uint16', 1]

# From the BMV's
MODBUS_B1_V             = [237, 259, 1, 'uint16', 100]
MODBUS_B1_A             = [237, 261, 1, 'int16', 10]
MODBUS_B1_SOC       = [237, 266, 1, 'uint16', 10]
MODBUS_B1_MID        = [237, 263, 1, 'uint16', 100]

MODBUS_B2_V             =  [238, 259, 1, 'uint16', 100]
MODBUS_B2_A             = [238 ,261, 1, 'int16', 10]
MODBUS_B2_SOC       = [238 ,266, 1, 'uint16', 10]
MODBUS_B2_TEMP     = [238, 262, 1, 'int16', 10]

# From the MultiPlus
MODBUS_AC_W            = [239, 23, 1, 'int16', 0.1] 
MODBUS_AC_V             = [239, 15, 1, 'uint16', 10]
MODBUS_AC_A             = [239, 18, 1, 'int16', 10]
MODBUS_AC_F             = [239, 21, 1, 'int16', 100]

# From the MultiPlus
MODBUS_STATE1        = [239, 31, 1, 'uint16', 1]
MODBUS_STATE2        = [239, 2318, 1, 'uint16', 1]

# From the PV inverter
MODBUS_PV_W            = [20, 1029, 1, 'uint16', 1]
MODBUS_PV_V             = [20, 1027, 1, 'uint16', 10]
MODBUS_PV_A             = [20, 1028, 1, 'int16', 10]

def log(formatString, argumentVector=None):
	if argumentVector is None:
		sLine = formatString   
	else:
		sLine = formatString % argumentVector
	#if
	syslog.syslog (syslog.LOG_INFO, sLine)
#end log

def varname (obj, namespace):
	return [name for name in namespace if namespace[name] is obj]
#end varname

def decode (venus_modbustcp, item):
	received = venus_modbustcp.read_input_registers (address=item[1], count=item[2], unit=item[0])
	message = BinaryPayloadDecoder.fromRegisters(received.registers, endian=Endian.Big)
	if item[3] == 'int32':
		interpreted = message.decode_32bit_int()
	elif item[3] == 'uint32':
		interpreted = message.decode_32bit_uint()
	elif item[3] == 'iunt:64':
		interpreted = message.decode_64bit_uint()
	elif item[3] == 'str32':
		interpreted = message.decode_string(32)
	elif item[3] == 'int16':
		interpreted = message.decode_16bit_int()
	elif item[3] == 'uint16':
		interpreted = message.decode_16bit_uint()
	else: ## if no data type is defined do raw interpretation of the delivered data
		interpreted = message.decode_16bit_uint()

	## check for "None" data before doing anything else
	if item[4]:
		if ((interpreted == MIN_SIGNED) or (interpreted == MAX_UNSIGNED)):
			displaydata = None
		else:
			displaydata = float(interpreted) / float(item[4])
		#end if
	#end if
	return displaydata
#end decode

try:
	venus_modbustcp = ModbusClient(VENUSOS_IP, port=502)
	if venus_modbustcp.connect():
		log ('Connected')
		try:
			MP_B_V       = decode (venus_modbustcp, MODBUS_MP_B_V)
			MP_B_A       = decode (venus_modbustcp, MODBUS_MP_B_A)
			MP_B_SOC = decode (venus_modbustcp, MODBUS_MP_B_SOC)

			B1_V             = decode (venus_modbustcp, MODBUS_B1_V)
			B1_A             = decode (venus_modbustcp, MODBUS_B1_A)
			B1_SOC       = decode (venus_modbustcp, MODBUS_B1_SOC)
			B1_MID        = decode (venus_modbustcp, MODBUS_B1_MID)

			B2_V             = decode (venus_modbustcp, MODBUS_B2_V)
			B2_A             = decode (venus_modbustcp, MODBUS_B2_A)
			B2_SOC       = decode (venus_modbustcp, MODBUS_B2_SOC)
			B2_TEMP     = decode (venus_modbustcp, MODBUS_B2_TEMP)

			AC_W           = decode (venus_modbustcp, MODBUS_AC_W)
			AC_V            = decode (venus_modbustcp, MODBUS_AC_V)
			AC_A            = decode (venus_modbustcp, MODBUS_AC_A)
			AC_F            = decode (venus_modbustcp, MODBUS_AC_F)

			PV_W           = decode (venus_modbustcp, MODBUS_PV_W)
			PV_V            = decode (venus_modbustcp, MODBUS_PV_V)
			PV_A            = decode (venus_modbustcp, MODBUS_PV_A)
			
			STATE1         = decode (venus_modbustcp, MODBUS_STATE1)
			#STATE2         = decode (venus_modbustcp, MODBUS_STATE2)

			DC_V            = (B1_V + B2_V) / 2.0
			DC_A            = MP_B_A - B1_A - B2_A
			DC_W           = DC_V * DC_A

			#print 'MP B V = %0.2f V' %  MP_B_V
			#print 'MP B A = %0.2f A' % MP_B_A
			#print 'MP B SoC = %0.2f%%' % MP_B_SOC

			#print 'B1 V = %0.2f V' %  B1_V
			#print 'B1 A = %0.2f A' % B1_A
			#print 'B1 SoC = %0.2f%%' %  B1_SOC
			#print 'B1 mid = %0.2f V' % B1_MID

			#print 'B2 V = %0.2f V' % B2_V
			#print 'B2 A = %0.2f A' % B2_A
			#print 'B2 SoC = %0.2f%%' % B2_SOC
			#print 'B2 temp = %0.2f deg/C' % B2_TEMP

			#print 'AC W = %0.2f W' % AC_W
			#print 'AC V = %0.2f V' % AC_V
			#print 'AC A = %0.2f A' % AC_A
			#print 'AC F = %0.2f Hz' % AC_F

			#print 'PV W = %0.2f W' % PV_W
			#print 'PV V = %0.2f V' % PV_V
			#print 'PV A = %0.2f A' % PV_A

			#print 'DC V = %0.2f V' % DC_V
			#print 'DC def decode (venus_modbustcp, item):
	received = venus_modbustcp.read_input_registers (address=item[1], count=item[2], unit=item[0])
	message = BinaryPayloadDecoder.fromRegisters(received.registers, endian=Endian.Big)
	if item[3] == 'int32':
		interpreted = message.decode_32bit_int()
	elif item[3] == 'uint32':
		interpreted = message.decode_32bit_uint()
	elif item[3] == 'iunt:64':
		interpreted = message.decode_64bit_uint()
	elif item[3] == 'str32':
		interpreted = message.decode_string(32)
	elif item[3] == 'int16':
		interpreted = message.decode_16bit_int()
	elif item[3] == 'uint16':
		interpreted = message.decode_16bit_uint()
	else: ## if no data type is defined do raw interpretation of the delivered data
		interpreted = message.decode_16bit_uint()

	## check for "None" data before doing anything else
	if item[4]:
		if ((interpreted == MIN_SIGNED) or (interpreted == MAX_UNSIGNED)):
			displaydata = None
		else:
			displaydata = float(interpreted) / float(item[4])
		#end if
	#end if
	return displaydataA = %0.2f A' % DC_A
			#print 'DC W = %0.2f W' % DC_W

			f = open(sys.argv[1], "w")
			f.write ( 'MP_B_V=%0.2f\n' %  MP_B_V)
			f.write ( 'MP_B_A=%0.2f\n' % MP_B_A)
			f.write ( 'MP_B_SOC=%0.2f\n' % MP_B_SOC)
			f.write ( 'B1_V=%0.2f \n' %  B1_V)
			f.write ( 'B1_A=%0.2f\n' % B1_A)
			f.write ( 'B1_SOC=%0.2f\n' %  B1_SOC)
			f.write ( 'B1_MID=%0.2f\n' % B1_MID)
			f.write ( 'B2_V=%0.2f\n' % B2_V)
			f.write ( 'B2_A=%0.2f\n' % B2_A)
			f.write ( 'B2_SOC=%0.2f\n' % B2_SOC)
			f.write ( 'B2_TEMP=%0.2f\n' % B2_TEMP)
			f.write ( 'AC_W=%0.2f\n' % AC_W)
			f.write ( 'AC_V=%0.2f\n' % AC_V)
			f.write ( 'AC_A=%0.2f\n' % AC_A)
			f.write ( 'AC_F=%0.2f\n' % AC_F)
			f.write ( 'PV_W=%0.2f\n' % PV_W)
			f.write ( 'PV_V=%0.2f\n' % PV_V)
			f.write ( 'PV_A=%0.2f\n' % PV_A)
			f.write ( 'DC_V=%0.2f\n' % DC_V)
			f.write ( 'DC_A=%0.2f\n' % DC_A)
			f.write ( 'DC_W=%0.2f\n' % DC_W)
			f.write ( 'AC_A_NETT=%0.2f\n' % (PV_A+AC_A))
			f.write ( 'AC_W_NETT=%0.2f\n' % (PV_W+AC_W))
			f.write ('STATE=%d\n' % STATE1)
			#f.write ('STATE2=%d' % STATE2)
			f.close()

		finally:
			venus_modbustcp.close()
			log ("Disconnected")
		#try
	else:
		log ('Unable to connect to %s', (VENUSOS_IP))
	#end  if
except Exception, err:
	log ("Exception: %s", err)
#end try

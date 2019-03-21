#!/usr/bin/python

from pymodbus.client.sync import ModbusTcpClient as ModbusClient
from pymodbus.payload import BinaryPayloadDecoder
from pymodbus.constants import Endian

class ModBus_API:

	def __init__(self, IP_ADDRESS='169.254.167.246'):
		self.MIN_SIGNED = -2147483648
		self.MAX_UNSIGNED =  4294967295
		self.COLOR_CONTROL_IP = IP_ADDRESS
		self.client = None

	def connect_to_ccgx(self):
		try:
			self.client = ModbusClient(self.COLOR_CONTROL_IP,port='502')
			if(self.client.connect()):
				print('Successfully connected to: {0}'.format(self.COLOR_CONTROL_IP))
			else:
				print('Error while connecting to: {0}'.format(self.COLOR_CONTROL_IP))
		except:
			print('Error connecting')

	def read_device_data(self,address, unit, count=1, d_type='int32'):
		received = self.client.read_input_registers (address=address, count=count, unit=unit)
		message = BinaryPayloadDecoder.fromRegisters(received.registers,Endian.Big)
		if d_type == 'int32':
			interpreted = message.decode_32bit_int()
		elif d_type == 'uint32':
			interpreted = message.decode_32bit_uint()
		elif d_type == 'iunt:64':
			interpreted = message.decode_64bit_uint()
		elif d_type == 'str32':
			interpreted = message.decode_string(32)
		elif d_type == 'int16':
			interpreted = message.decode_16bit_int()
		elif d_type == 'uint16':
			interpreted = message.decode_16bit_uint()
		else: ## if no data type is defined do raw interpretation of the delivered data
			interpreted = message.decode_16bit_uint()
		return interpreted

	def close(self):
		self.client.close()
	
	def battery_state_map(self,n):
		n = int(n)
		if n == 0:
			return 'idle'
		elif n == 1:
			return 'charging'
		elif n == 2:
			return 'discharging'

	def show_data(self):
		print('Battery voltage: {0}V'.format(self.read_device_data(840,100,d_type='uint16')/10.0))
		print('Battery current: {0}A'.format(self.read_device_data(841,100,d_type='int16')/10.0))
		print('Battery power: {0}W'.format(self.read_device_data(842,100,d_type='int16')))
		print('Battery state of charge: {0}%'.format(self.read_device_data(843,100,d_type='uint16')))
		print('Battery state: {0}'.format(self.battery_state_map(self.read_device_data(844,100,d_type='int16'))))
		print('AC consumption: {0}W'.format(self.read_device_data(817,100,d_type='int16')))
		print('vebus volt : {0}'.format(float(self.read_device_data(15,246,d_type='uint16'))/10.0))
		print('vebus current : {0}'.format(float(self.read_device_data(18,246,d_type='int16'))/10.0))



x  = ModBus_API()
x.connect_to_ccgx()
x.show_data()

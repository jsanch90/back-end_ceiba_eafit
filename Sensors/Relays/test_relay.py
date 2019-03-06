import RPi.GPIO as GPIO
from time import sleep

relayPin1 = 32 #relay 1
relayPin2 = 36 #relay 2

GPIO.setmode(GPIO.BOARD)

GPIO.setup(relayPin1, GPIO.OUT)
GPIO.setup(relayPin2, GPIO.OUT)


while True:
    ## Turn on the Relay
    GPIO.output(relayPin1,GPIO.HIGH)
    sleep(5)
    GPIO.output(relayPin2,GPIO.HIGH)
    sleep(5)

    ## Turn off the Relay
    GPIO.output(relayPin1,GPIO.LOW)
    sleep(5)
    GPIO.output(relayPin2,GPIO.LOW)
    sleep(5)

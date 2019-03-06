import RPi.GPIO as GPIO
from time import sleep

relayPin = 32

GPIO.setmode(GPIO.BOARD)
GPIO.setup(relayPin, GPIO.OUT)


while True:
    ## Turn on the Relay (this works - it clicks gives 3.3v)
    GPIO.output(relayPin,GPIO.HIGH)
    sleep(5)

    ## Turn off the Relay (this does nothing but goes back to 0v)
    GPIO.output(relayPin,GPIO.LOW)
    sleep(5)

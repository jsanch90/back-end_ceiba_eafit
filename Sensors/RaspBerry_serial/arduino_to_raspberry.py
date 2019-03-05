import serial

port = "/dev/ttyACM0"
s1 = serial.Serial(port,9600)
s1.flushInput()

def make_json(line):
    parts = line.split(',')
    var_names = parts[0].split(';')
    values = parts[1].strip('\r\n').split(';')
    json_body=''
    print(var_names)
    print(values)
    for i in range(len(var_names)):
        if i == len(var_names):
            json_body+='{0}:{1}\n'.format(var_names[i],values[i])
        json_body+='{0}:{1},\n'.format(var_names[i],values[i])
    last_comma_index = json_body.rfind(',')
    json_body = json_body[:last_comma_index]+json_body[last_comma_index+1:]
    return '{\n'+'{0}'.format(json_body)+'}'

while True:
    if s1.inWaiting()>0:
        line = s1.readline()
        if len(line) > 1:
            print(make_json(line))

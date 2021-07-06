#!/usr/bin/python
import rospy
from rover_control.msg import arm_motors
import serial

ser = serial.Serial('/dev/ttyACM0', 9600)


def callback(data):
    if data.command_string == 2728:
        ser.write("q")
    elif data.command_string == 2722:
        ser.write("w")
    elif data.command_string == 2698:
        ser.write("e")
    elif data.command_string == 2602:
        ser.write("r")
    elif data.command_string == 3242:
        ser.write("t")
    elif data.command_string == 682:
        ser.write("y")
    elif data.command_string == 2732:
        ser.write("a")
    elif data.command_string == 2738:
        ser.write("s")
    elif data.command_string == 2762:
        ser.write("d")
    elif data.command_string == 2858:
        ser.write("f")
    elif data.command_string == 2218:
        ser.write("g")
    elif data.command_string == 4778:
        ser.write("h")
    else:
        ser.write("b")



def listener():
    rospy.init_node('listener', anonymous=True)
    rospy.Subscriber("rover_arm", arm_motors, callback)
    rospy.spin()


if __name__ == '__main__':
    listener()

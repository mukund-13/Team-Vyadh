#!/usr/bin/env python
import rospy
from sensor.msg import magneto


import time
import math
import py_qmc5883l
declination=-1.14
pi= 3.14159265359 
sensor = py_qmc5883l.QMC5883L()
def h_angle():
        mag_values=sensor.get_magnet()
        x=mag_values[0]
        y=mag_values[1]
        z=mag_values[2]
        print(x,y,z)
        heading = math.atan2(y, x) + declination
        
        #Due to declination check for >360 degree
        if(heading > 2*pi):
                heading = heading - 2*pi

        #check for sign
        if(heading < 0):
                heading = heading + 2*pi

        #convert into angle
        heading_angle = int(heading * 180/pi)

        print ("Heading Angle = %d"%heading_angle)
        #time.sleep(1)
        
        return [heading_angle]

def talkers3():
    pub = rospy.Publisher('heading_angle1', magneto,queue_size=2)
    rospy.init_node('heading_angle', anonymous=True)
    r = rospy.Rate(100) #10hz
    
    while not rospy.is_shutdown():
	mag1_values=h_angle()
        msg_mag=magneto()
        msg_mag.heading_angle=mag1_values[0]
	rospy.loginfo(msg_mag)
        pub.publish(msg_mag)
        r.sleep()


if __name__ == '__main__':
    try:
        talkers3()
    except rospy.ROSInterruptException: pass
        


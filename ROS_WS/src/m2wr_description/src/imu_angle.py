#!/usr/bin/env python
import rospy 
from sensor_msgs.msg import Imu
from geometry_msgs.msg import Quaternion
from tf.transformations import euler_from_quaternion
import math

def callback(data):
	global roll,pitch,yaw
	orientation_q = data.orientation
	orientation_list = [orientation_q.x, orientation_q.y, orientation_q.z, orientation_q.w]
	(roll, pitch, yaw) = euler_from_quaternion(orientation_list)
	print(math.degrees(yaw))

def listener():
	rospy.init_node("imu_nav",anonymous=True)
	rospy.Subscriber("/android/imu",Imu,callback)
	rospy.spin()

if __name__=="__main__":
	listener()	

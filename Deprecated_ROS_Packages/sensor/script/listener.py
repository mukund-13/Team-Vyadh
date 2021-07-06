#!/usr/bin/env python
import rospy
from sensor.msg import R_ANGLES
from sensor.msg import Mpu
from sensor.msg import magneto

arm_angles = R_ANGLES()

def magneto_callback(data):
    arm_angles.heading_angle = data.heading_angle
    
    #rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)
    
def mpu1_callback(data):
    arm_angles.elbow_angle = data.Ay
    
    #rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)

def mpu2_callback(data):
    arm_angles.shoulder_angle = data.Ay
    
    #rospy.loginfo(rospy.get_caller_id() + "I heard %s", data.data)

def listener():
     pub=rospy.Publisher('/arm_sensor_listener1',R_ANGLES,queue_size=2)
     while not rospy.is_shutdown():
	     rospy.init_node('arm_sensor_listener', anonymous=True)
	     rospy.Subscriber('heading_angle1',magneto, magneto_callback)
	     rospy.Subscriber('shoulder_angle1',Mpu, mpu1_callback)
	     rospy.Subscriber('elbow_angle1',Mpu, mpu2_callback)
 	     pub.publish(arm_angles)
	     
     
     rospy.loginfo(arm_angles)
     rospy.spin()
         
         
         

if __name__ == '__main__':
    try:
	
        listener()
    except rospy.ROSInterruptException: pass

   
     
     

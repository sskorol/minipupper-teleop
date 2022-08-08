import ROSLIB from 'roslib'
import { KEY_MESSAGE_TYPE, TELEOP_MESSAGE_TYPE, KEY_TOPIC, RECONNECTION_TIMER, ROSBRIDGE_CONNECTION_URL, TELEOP_TOPIC } from '../constants'

const Ros = ROSLIB.Ros
const RosTopic = ROSLIB.Topic
const RosMessage = ROSLIB.Message

class RosController {

  constructor(setIsWSConnected, setIsTeleopReady) {
    this.setIsWSConnected = setIsWSConnected
    this.setIsTeleopReady = setIsTeleopReady
    this.keyTopic = null
    this.teleopTopic = null
    this.ros = new Ros()
    this.ros.on('connection', () => {
      console.info('Connected to ROS bridge')
      this.setIsWSConnected && this.setIsWSConnected(true)
      this.keyTopic = new RosTopic({
        ros: this.ros,
        name: KEY_TOPIC,
        messageType: KEY_MESSAGE_TYPE,
      })
      this.teleopTopic = new RosTopic({
        ros: this.ros,
        name: TELEOP_TOPIC,
        messageType: TELEOP_MESSAGE_TYPE,
      })
      this.teleopTopic.subscribe((msg) => this.setIsTeleopReady && this.setIsTeleopReady(msg.data))
    })
    this.ros.on('close', () => {
      console.warn('Disconnected from ROS bridge')
      this.setIsWSConnected && this.setIsWSConnected(false)
      this.setIsTeleopReady && this.setIsTeleopReady(false)
      setTimeout(() => this.connect(), RECONNECTION_TIMER)
      this.keyTopic = null
      this.teleopTopic = null
    })
    this.ros.on('error', (error) => console.log(error))
  }

  connect = () => {
    try {
      this.ros.connect(ROSBRIDGE_CONNECTION_URL)
    } catch (error) {
      console.error(`Unable to connected to ROS bridge: ${error.toString()}`)
    }
  }

  disconnect = () => {
    this.ros.close()
    this.setIsWSConnected && this.setIsWSConnected(false)
    this.setIsTeleopReady && this.setIsTeleopReady(false)
  }

  isConnected = () => {
    return this.ros.isConnected
  }

  publishKey = (key) => {
    if (this.keyTopic) {
      const keyMessage = new RosMessage({ data: key })
      this.keyTopic.publish(keyMessage)
    }
  }
}

export default RosController

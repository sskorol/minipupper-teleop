import ROSLIB from 'roslib';
import {
    KEY_MESSAGE_TYPE,
    KEY_TOPIC,
    RECONNECTION_TIMER,
    ROSBRIDGE_CONNECTION_URL
} from "../constants";

const Ros = ROSLIB.Ros;
const RosTopic = ROSLIB.Topic;
const RosMessage = ROSLIB.Message;


class RosController {

    constructor(setIsWSConnected) {
        this.setIsWSConnected = setIsWSConnected;
        this.ros = new Ros();
        this.ros.on("connection", () => {
            console.info("Connected to ROS bridge");
            this.setIsWSConnected && this.setIsWSConnected(true);
        });
        this.ros.on("close", () => {
            console.warn("Disconnected from ROS bridge");
            this.setIsWSConnected && this.setIsWSConnected(false);
            setTimeout(() => this.connect(), RECONNECTION_TIMER);
        });
        this.ros.on("error", (error) => console.log(error));
    }

    connect = () => {
        try {
            this.ros.connect(ROSBRIDGE_CONNECTION_URL);
        } catch (error) {
            console.error(`Unable to connected to ROS bridge: ${error.toString()}`);
        }
    }

    disconnect = () => {
        this.ros.close();
        this.setIsWSConnected && this.setIsWSConnected(false);
    }

    isConnected = () => {
        return this.ros.isConnected
    }

    publishKey = (key) => {
        const keyTopic = new RosTopic({
            ros: this.ros,
            name: KEY_TOPIC,
            messageType: KEY_MESSAGE_TYPE
        });
        const keyMessage = new RosMessage({data: key});
        keyTopic.publish(keyMessage);
    }
}

export default RosController;

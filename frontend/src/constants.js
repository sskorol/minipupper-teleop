export const BUFFERING_LEEWAY = +(import.meta.env.REACT_APP_BUFFERING_LEEWAY || 1000)
export const AUTO_HIDE_CONTROLS_TIME = +(import.meta.env.REACT_APP_AUTO_HIDE_CONTROLS_TIME || 4000)
export const ROSBRIDGE_SERVER_IP = import.meta.env.REACT_APP_ROSBRIDGE_SERVER_IP || '127.0.0.1'
export const ROSBRIDGE_SERVER_PORT = import.meta.env.REACT_APP_ROSBRIDGE_SERVER_PORT || '9090'
export const ROSBRIDGE_CONNECTION_URL = `ws://${ROSBRIDGE_SERVER_IP}:${ROSBRIDGE_SERVER_PORT}`
export const BE_URL = import.meta.env.REACT_APP_BE_URL || '127.0.0.1'
export const RECONNECTION_TIMER = +(import.meta.env.REACT_APP_RECONNECTION_TIMER || 1000)
export const KEY_TOPIC = import.meta.env.REACT_APP_KEY_TOPIC || '/key'
export const TELEOP_TOPIC = import.meta.env.REACT_APP_TELEOP_TOPIC || '/teleop_status'
export const KEY_MESSAGE_TYPE = 'std_msgs/String'
export const TELEOP_MESSAGE_TYPE = 'std_msgs/Bool'
export const CameraType = {
    DEPTH: 'depth',
    RGB: 'rgb',
    SIMULATOR: 'simulator'
}
export const NNType = {
    MOBILENET_SSD: 'mobilenet-ssd',
    NONE: ''
}

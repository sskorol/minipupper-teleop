## MiniPupper Teleop

This project allows streaming video from [MiniPupper](https://minipupperdocs.readthedocs.io/en/latest/) via WebRTC and teleoperating it via ROS. Note that the [backend](https://github.com/sskorol/minipupper-teleop/tree/main/backend) expects you've already connected [OAK-D Lite](https://shop.luxonis.com/products/oak-d-lite-1) camera to your robot. If you don't have one yet, you can still teleoperate the robot via keyboard, but w/o a camera stream.

![pupper-teleop-demo](https://user-images.githubusercontent.com/6638780/183462753-844e2948-4093-493f-ab90-e769b0c69c30.gif)

- [MiniPupper Teleop](#minipupper-teleop)
  - [Modules](#modules)
  - [Installation](#installation)
    - [Running](#running)
    - [Building FE and BE](#building-fe-and-be)
  - [Known Issues](#known-issues)

### Modules

The following diagram reflects the most recent implementation (note that the real container names might be slightly different):

![MiniPupper modules](https://user-images.githubusercontent.com/6638780/183448806-1c0e49bc-4ac5-4445-a1d6-ad5d2d861b4c.png)

- **roscore**: a master node that handles all the ROS requests;
- **rosbridge**: WS proxy between FE and ROS that accepts messages (keys) from the remote browser and passes them to ROS nodes;
- **webrtc-be**: Python BE, which streams OAK-D Lite camera video to the remote browser via WebRTC (internally uses [DepthAI](https://docs.luxonis.com/projects/api/en/latest/index.html) API);
- **teleop-fe**: ReactJS FE which uses [roslibjs](https://github.com/RobotWebTools/roslibjs) to communicate with ROS bridge and WebRTC API for camera streaming;
- **servo-drv**: MiniPupper's servo driver node, which listens to CHAMP messages and changes joints' angles;
- **vel-smoother/CHAMP**: [CHAMP](https://github.com/chvmp/champ) framework does the kinematics' stuff to control the robot's movements;
- **teleop**: a slightly modified [teleop-legged-robots](https://github.com/SoftServeSAG/teleop_legged_robots) node to accept remote keys rather than local keyboard events.

Note that `velocity-smoother` was intentionally splitted from `champ` due to netwroking issue mentioned in a [known issues](#known-issues) section.

### Installation

Check the [official guide](https://docs.docker.com/engine/install/ubuntu/) if you don't have Docker yet. Note that you need both `docker` and `docker-compose` CLI tools installed on MiniPupper.

Clone the source code:

```shell
git pull https://github.com/sskorol/minipupper-teleop.git && cd https://github.com/sskorol/minipupper-teleop.git
```

Prepare calibration and env files:

```shell
./generate_configs.sh [MINI_PUPPER_IP_ADDRESS]
```

Adjust angles in `calibration_settings.yaml` to match your own robot's calibration data.

MiniPupper's IP is required for the FE container to be able to communicate with the BE via remote browser.

#### Running

Run the following command to start a stack of docker images required to perform teleoperation:

```shell
docker compose up -d
```

An old docker cli uses a bit different syntax: `docker-compose up -d`.

Open your web browser and go to: `http://[MINI_PUPPER_IP_ADDRESS]`

#### Building FE and BE

Run the following command on MiniPupper to build FE and BE images:

```shell
docker compose build
```

### Known Issues

In rare cases `teleop`, `smoother` and `servo` nodes can't correctly publish/subscribe to `/cmd_vel` topic due to registration failure. The current workaround is displayed on the following diagram.

![Docker networking issue](https://user-images.githubusercontent.com/6638780/183454585-49ca757e-a932-4dbe-a5ba-95007cfaafec.png)

You can try to restart docker images to see if it helps. I couldn't yet found the root cause of these Docker <---> ROS networking issues. Feel free to contact [author](mailto:serhii.s.korol@gmail.com) if you have any idea on how to stabilize it.

Run the following command on MiniPupper to diagnose potential errors in logs:

```shell
docker compose logs -f
```

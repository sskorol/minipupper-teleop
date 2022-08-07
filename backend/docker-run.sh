#!/bin/bash

docker run --rm -d \
  -v /dev/bus/usb:/dev/bus/usb \
  --device-cgroup-rule='c 189:* rmw' \
  --network=host \
  sskorol/minipupper-be:0.0.1

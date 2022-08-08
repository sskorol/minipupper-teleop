#!/bin/bash

IP=$1
cp calibration_settings.template.yaml calibration_settings.yaml && \
echo "HOST_IP=${IP}" > .env

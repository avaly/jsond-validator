#!/bin/bash

MODULE_DIR="node_modules/jsond-validator"

mkdir -p $MODULE_DIR
cp ../../lib/index.js.flow $MODULE_DIR/index.js.flow

flow check

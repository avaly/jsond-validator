#!/bin/bash

set -xeuo pipefail

THIS_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROOT_DIR=$(cd $THIS_DIR/../.. && pwd)
NODE_MODULES_DIR="${THIS_DIR}/node_modules"
MODULE_DIR="${NODE_MODULES_DIR}/jsond-validator"

rm -rf $NODE_MODULES_DIR
mkdir -p $NODE_MODULES_DIR

cp -fR $ROOT_DIR/node_modules/debug $NODE_MODULES_DIR/debug

mkdir -p $MODULE_DIR
mkdir -p $MODULE_DIR/lib
cp -f $ROOT_DIR/package.json $MODULE_DIR/package.json
cp -fR $ROOT_DIR/lib/* $MODULE_DIR/lib/

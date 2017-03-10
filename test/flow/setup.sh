#!/bin/bash

set -xeuo pipefail

THIS_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ROOT_DIR=$(cd $THIS_DIR/../.. && pwd)
MODULE_DIR="${THIS_DIR}/node_modules/jsond-validator"

mkdir -p $MODULE_DIR
ln -f -s $ROOT_DIR/node_modules/debug $THIS_DIR/node_modules/debug
ln -f -s $ROOT_DIR/package.json $MODULE_DIR/package.json
mkdir -p $MODULE_DIR/lib
ln -f -s $ROOT_DIR/lib/index.js $MODULE_DIR/lib/index.js
ln -f -s $ROOT_DIR/lib/index.js.flow $MODULE_DIR/lib/index.js.flow

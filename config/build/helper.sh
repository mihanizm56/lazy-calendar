#!/bin/bash

# copy all styles to the lib folder
node config/build/copy-style.js &&
# clear lib from stories and test folders
node config/build/clear-lib.js
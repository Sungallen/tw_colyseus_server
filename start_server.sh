#!/bin/bash
pm2 del all
export NODE_OPTIONS="--max-old-space-size=8192"
# pm2 serve ./cityscope-taiwan-island/build/ 3001 -i 4 --name "tw_islan" 
# pm2 serve ./cityscope-taiwan-island-controller/build/ 3002 -i 4 --name "tw_islan_ctl" 
# pm2 
pm2 start yarn --name "tw_server_colyseus" -- run start

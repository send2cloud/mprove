#!/usr/bin/env bash

# mprove-backend-node
rm -rf /Users/akalitenya/mprove-backend-node/src/api
mkdir /Users/akalitenya/mprove-backend-node/src/api
cp -rf /Users/akalitenya/mprove-api/src/ /Users/akalitenya/mprove-backend-node/src/api

cp -rf /Users/akalitenya/mprove-api/.prettierrc.yaml /Users/akalitenya/mprove-backend-node/.prettierrc.yaml
cp -rf /Users/akalitenya/mprove-api/tslint-base.json /Users/akalitenya/mprove-backend-node/tslint-base.json

# mprove-blockml-node
rm -rf /Users/akalitenya/mprove-blockml-node/src/api
mkdir /Users/akalitenya/mprove-blockml-node/src/api
cp -rf /Users/akalitenya/mprove-api/src/ /Users/akalitenya/mprove-blockml-node/src/api

cp -rf /Users/akalitenya/mprove-api/.prettierrc.yaml /Users/akalitenya/mprove-blockml-node/.prettierrc.yaml
cp -rf /Users/akalitenya/mprove-api/tslint-base.json /Users/akalitenya/mprove-blockml-node/tslint-base.json

# mprove-web-app
rm -rf /Users/akalitenya/mprove-web-app/src/app/api
mkdir /Users/akalitenya/mprove-web-app/src/app/api
cp -rf /Users/akalitenya/mprove-api/src/ /Users/akalitenya/mprove-web-app/src/app/api

cp -rf /Users/akalitenya/mprove-api/.prettierrc.yaml /Users/akalitenya/mprove-web-app/.prettierrc.yaml
cp -rf /Users/akalitenya/mprove-api/tslint-base.json /Users/akalitenya/mprove-web-app/tslint-base.json
cp -rf /Users/akalitenya/mprove-api/tslint-codelyzer.json /Users/akalitenya/mprove-web-app/tslint-codelyzer.json

# mprove-docs-app
cp -rf /Users/akalitenya/mprove-api/.prettierrc.yaml /Users/akalitenya/mprove-docs-app/.prettierrc.yaml
cp -rf /Users/akalitenya/mprove-api/tslint-base.json /Users/akalitenya/mprove-docs-app/tslint-base.json
cp -rf /Users/akalitenya/mprove-api/tslint-codelyzer.json /Users/akalitenya/mprove-docs-app/tslint-codelyzer.json

# mprove-landing-app
cp -rf /Users/akalitenya/mprove-api/.prettierrc.yaml /Users/akalitenya/mprove-landing-app/.prettierrc.yaml
cp -rf /Users/akalitenya/mprove-api/tslint-base.json /Users/akalitenya/mprove-landing-app/tslint-base.json
cp -rf /Users/akalitenya/mprove-api/tslint-codelyzer.json /Users/akalitenya/mprove-landing-app/tslint-codelyzer.json

# mprove-data-generator
cp -rf /Users/akalitenya/mprove-api/.prettierrc.yaml /Users/akalitenya/mprove-data-generator/.prettierrc.yaml
cp -rf /Users/akalitenya/mprove-api/tslint-base.json /Users/akalitenya/mprove-data-generator/tslint-base.json
cp -rf /Users/akalitenya/mprove-api/tslint-codelyzer.json /Users/akalitenya/mprove-data-generator/tslint-codelyzer.json
## foundation-clone

A clone of http://foundation.bz/

## Description

#### Structure

The `./client` folder contains source and build files of the client HTML5 application where the other folders/files are all server-related (for the API). The `./client` folder is being included for simplicity sake (hosted by the same API server so I don't need to deal with CORS for now).

The client is mounted at /app (i.e. http://localhost:3000/app) while the server API is /api (i.e. http://localhost:3000/api/episode).

#### Demo Instructions

1. Install git
1. Install [Node.js](http://nodejs.org/) which should include NPM
1. Clone the repo
1. CD into the dir
1. Execute `npm install`
1. Execute `node app`
1. Browse to http://localhost:3000/app

#### Build Instructions

1. Read ./client/README.md

## TODO

1. Scroll with hover on start/end of video list
1. Responsive current episode
1. Bug: scrollbar is disabled if there's delay in rendering of the thumbnails
1. Unit test of common directive
1. Complete build (concatenation & minification) -  there's minor problem with it
1. I18N
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
1. Execute `export NODE_ENV=production`
  1. For Windows: `set NODE_ENV production`
1. Execute `node app`
1. Browse to http://localhost:3000/app

#### Build Instructions

1. Read ./client/README.md

## Differences with original site
1. It is responsive to screen size changes
1. (Thus) it can be viewed in mobile browsers
1. It doesn't have the hover-to-scroll function
  1. This is because hover-and-do-something is not a good UX practice

## Areas to improve

1. I18N
1. Concatenate all images into an image sprite to reduce http calls
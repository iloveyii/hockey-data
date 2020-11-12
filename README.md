# DT581B - Project

## THE PURPOSE OF THIS PROJECT

- Develope an application that is accessible on mobile platforms
- Contribute to the sustainable development goals from environmental perspective

|                                                         **HKR**                                                          |                                                          ** Course**                                                           |                                                        ** Technologies**                                                         |
| :----------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
|         ![hkr](https://github.com/iloveyii/mobile-platforms-dt581b-lab2/blob/master/react/public/images/hkr.png)         |         ![DT581B](https://github.com/iloveyii/mobile-platforms-dt581b-lab2/blob/master/react/public/images/dt581b.png)         |          ![mongo](https://github.com/iloveyii/mobile-platforms-dt581b-lab2/blob/master/react/public/images/mongodb.png)          |
|    ![express](https://github.com/iloveyii/mobile-platforms-dt581b-lab2/blob/master/react/public/images/expressjs.png)    |         ![react](https://github.com/iloveyii/mobile-platforms-dt581b-lab2/blob/master/react/public/images/reactjs.png)         |           ![node](https://github.com/iloveyii/mobile-platforms-dt581b-lab2/blob/master/react/public/images/nodejs.png)           |
|     ![bash](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/bash.jpg)     | ![material ui](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/material-ui.png) |      ![heroku](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/heroku2.jpeg)      |
| ![firebase](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/firebase.png) |         ![aws](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/aws.png)         | ![react native](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/react-native.png) |
|    ![redux](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/redux.png)    |  ![typescript](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/typescript.jpg)  |       ![owasp](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/frontend/public/images/owasp.jpeg)        |

- [DEMO PROJECT - Link 1](http://hkr-project.hopto.org:7700)

# PROJECT PROPOSAL - SMART HOME

Kristianstad City provides accommodation facilities to many inhabitants including students, families and workers in the area.
Accommodating various cultures also brings poor energy awareness and law and order problems in that area. Therefore it is very important to provide good and secure services to all inhabitants and bring peace of mind.
In this project we are building a smart IoT based solution for not only energy conservation but also smart locking systems for better living experience. It will not only improve energy conservation but also reduce expenses for locking systems.

| iOS                                                                                                   | Android                                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| ![ios](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/documentation/ios.jpg) | ![android](https://github.com/iloveyii/mobile-platforms-dt581b-project/blob/master/documentation/android.jpg) |
| [Remote](https://expo.io/@softhem/projects/remote)                                                    | [Remote](https://expo.io/@softhem/projects/remote)                                                            |
| [Simulator](https://expo.io/@softhem/projects/door)                                                   | [Simulator](https://expo.io/@softhem/projects/door)                                                           |

# INSTALLATION

We will use Ubuntu as operating system for all installations below.

## CONFIGURATION

Automated deployment using webhooks.

- DEPLOY URL : http://hkr-project.hopto.org:7700/api/v1/deploy
- SERVER URL : http://hkr-project.hopto.org:7700/api/v1
- FRONTEND URL : http://hkr-project.hopto.org:7700

## NODE

- Install curl
  ` sudo apt install curl`
- Install Node Version Manager (NVM)
  `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
- Source profile `source ~/.bashrc`
- Install node v10 ` nvm install 10`
- Set as default `nvm use 10`
- If you want to use latest npm `npm install npm@latest -g`
- Install git `sudo apt install git`

## INITIALIZE

- Create a project/root directory e.g project.
- Initialize a git repo `git init .` and create .gitignore file
- Create a directory structure e.g project/frontend, project/backend, project/mobile/simulator, project/remote
- Make it an npm repo `npm init -y`, run this inside all directories above
- Create a README.md file at root directory.

## REACT

- CD to frontend
- Install react `npm i --save react react-dom`
- Install webpack `npm i --save-dev webpack webpack-cli webpack-dev-server`
- Install babel `npm i --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react html-webpack-plugin`
- Add a webpack config file `webpack.config.js`
- Add index.html, manifest.json, images
- Add package.json scripts commands i.e start, build, serve
- Add babel config file `.babelrc`
- Install backward compatibility `npm i --save @babel/polyfill`
- Install browserslist for supported browsers `npm i --save-dev browserslist`
- To reduce bundle size by dividing it into chunks `npm i --save-dev @babel/plugin-proposal-dynamic-import`, (optional)

#### Components

- Create a react component App.js
- Render App component in index.js

#### Material UI

- Install material ui `npm i --save @material-ui/core`
- Install material ui icons `npm i --save @material-ui/icons`

## NODE

- CD to node `cd backend`
- Install `dotenv express express-session`
- Create tslint.json and tsconfig.json files

## HOSTING

### Domain name

- We used a free service called noip.com which points to our IP address in AWS

### Firebase

- Install firebase package
  `npm i -g firebase-tools`
- Login firebase - login to website
  `firebase login`
- Init firebase and choose `Hosting: Configure and deploy Firebase Hosting sites` by pressing space key (and then Enter) on your keyboard.
  `firebase init`
- Select `Create new project` and enter a name e.g `mobile-platforms-lab1`
- Write `dist` as public directory.
- Deploy by running `firebase deploy`, this will give you a URL, click it to see app online.

### AWS

- Sine the app uses mongodb, node server and build script it is really easy to host it on AWS ec2
- This is a lot of time saving during development
- But AWS is expensive for these small projects therefore other hosting services have been discussed also.

### HEROKU

- Install Heroku CLI
- Update sudo apt update
- Install snap sudo apt install snapd
- Install sudo snap install heroku --classic
- Follow [Hosting](https://github.com/iloveyii/hosting) for details

## RUN THE APP

- FRONTEND

  - Clone the repo
    `git clone https://github.com/iloveyii/mobile-platforms-dt581b-lab2.git`
  - CD to directory
    `cd mobile-platforms-dt581b-lab2`
  - Configure `.env ` variable for settings, copy .env.example
  - Install dependencies
    `npm install`
  - Run the app, this command will open a browser window.
    `npm start`

- BACKEND

  - Clone the repo (if not done above)
    `git clone https://github.com/iloveyii/mobile-platforms-dt581b-lab2.git`
  - Configure `.env ` variable for mongodb and other settings, copy .env.example
  - Follow [Hosting](https://github.com/iloveyii/hosting) for details of monogodb setup.
  - Install dependencies
    `npm install`
  - Run the backend server.
    `npm start`
  - Run the backend console command for sensor device simulations
    `npm run start_sensors`

- USE PM2 - process manager

  - Dot (.) does not work in name (ie --name)
  - Create and Start server `pm2 start 'npm start' --name project-server`
  - Stop server `pm2 stop project-server`
  - Start again `pm2 start project-server`
  - Enable on startup `pm2 startup ubuntu`
  - Copy and paste the generated command in terminal

- SERVE STATIC

  - Node server serve static files which are actually the build package of frontend
  - When we build frontend app, it creates a directory dist at frontend/dist
  - Node server static feature points to frontend/dist folder to serve the frontend application
  - So we don't need a separate (like apache, nginx) sever to serve frontend application
  - Node server serves both frontend app and api calls.

- RUN MOBILE APP
  - CD to directory `mobile/simulator` for simulation or `mobile/remote` for remote control, run the following in both directories
  - You may need to install expo globally `npm i -g expo-cli`
  - Start App `expo start`
  - The above command will open a browser window and show you the QR code
  - You must have expo install on your mobile as well (both android, and ios have apps available)
  - Scan the QR code shown in the window with your camera (ios/apple phones), for android first open expo app and click scan QR code

# SECURTY

### Web Security

- Server on https than http
- Use nginx as a proxy to your real servers at backend
- Keep node server and mongodb on separate server

### Information Security

- Use proper login in system like jwt
- Use node middleware to authenticate each secure route
- Make sure to use middleware same_id so a user can only edit his/her own record
- Validate data both on frontend and backend
- Keep log of all important processes / operations

# TIPS and TRICKS

- Some time you need to get a nested value in JSON or name the json key differently
- In this example we rename stats in json to stat and get a nested value

```
// StatType
const StatType = new GraphQLObjectType({
  name: "Stat",
  description: "Single Stat",
  fields: {
    TOI: { type: GraphQLString },
    A: { type: GraphQLInt },
    PTS: { type: GraphQLInt },
  },
});

stat: {
      type: StatType,
      resolve: (parent, args) => ({
        TOI: parent.stats.TOI,
        A: parent.stats.A,
        PTS: parent.stats.PTS,
      })
}
```

# TROUBLESHOOTING

- Error in DB connection `Emit skipped error #693`
  - Remove \*.js file for ts file
- Module not found: Error: Can't resolve '@emotion/core'
  - Install `npm i --save @emotion/core @emotion/styled`
- Node GraphQL Error
  - `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'"`
  - Solution in app.ts - `app.use(helmet({ contentSecurityPolicy: false }));`

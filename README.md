# Project

## THE PURPOSE OF THIS PROJECT

- Mobile first
- Valfritt backend-ramverk
- Valfritt frontend-ramverk
- En single-page sida som visar tabellen på ett kreativt sätt
- Skriva en readme för att beskriva uppsättning lokalt

| Screenshot                                                                                 |
| ------------------------------------------------------------------------------------------ |
| ![hkr](https://github.com/iloveyii/hockey-data/blob/master/frontend/public/images/shl.png) |

- [DEMO PROJECT - Link 1](http://hockey-data.ddns.net:7700)
- [DEMO PROJECT - Link 2](http://52.55.155.45:7700)

## INSTALLATION

- We will use Ubuntu as operating system for all installations below, but it should work on any operating system.
- Install mongodb `sudo apt update & sudo apt install mongodb -y`
- Clone the repo `git clone https://github.com/iloveyii/hockey-data.git`
- Install packages in both backend and frontend by cd to backend or frontend and then `npm i` and then run both applications as `npm start`
- The frontend application will open browser, simply (change email to root@admin.com) click login and you will see SHL table at Dashboard.

## CONFIGURATION

- The application is developed using MERN (mongo, express, react, node) stack.
- The main configuration file for both backend (node, typescript) and frontend (React, ES6) .env file at the respective directories.
- FRESHNESS_TIME_SECONDS in backend/.env means how often (in seconds) the data should be fetched from API.
- A sample .env-example has been provided that you can rename to .env and adjust its content.

## COMPONENT - ShlGrid

- To use the reusable component ShlGrid in your own project, simply copy `frontend/ShlGrid` to your project and use it as

```
  import ShlGrid from "../ShlGrid";
  // .....
  <DataGrid rows={data} columns={columns} />
```

- The sample data is in `frontend/ShlGrid/mock.js`
- The sample columns is in `frontend/ShlGrid/columns.js`
- You don't need to provide any rows or columns for a static demo
- However you should provide `rows` and `columns` as stated above, for dynamic data.

## TROUBLESHOOTING

- `[nodemon] Internal watch failed: ENOSPC: System limit for number of file watchers r`
  - `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p `

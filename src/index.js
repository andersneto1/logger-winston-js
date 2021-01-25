"use strict";
const winston = require('winston')
const dayjs = require('dayjs')

const dateNameFile = dayjs().format('YYYY-MM-DD')
const created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')

//{level, error, appName, userData, appData, route, ip, dirAndNameFile, created_at, aditional: json}
const register = async(errorData) => {

  if(Object.keys(errorData).length === 0){
    return false;
  }    

  const logger = winston.createLogger({
    defaultMeta: { app: errorData.appName?errorData.appName:null},
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        name: 'error-file',
        level: 'error',
        filename: errorData.dirAndNameFile?errorData.dirAndNameFile:'logs/'+dateNameFile+'-error.log'
      }),
      new winston.transports.File({
        name: 'info-file',
        level: 'info',
        filename: errorData.dirAndNameFile?errorData.dirAndNameFile:'logs/'+dateNameFile+'-info.log'
      })
    ],
  });

  logger.log({
    level: errorData.level?errorData.level:'info',
    date: errorData.created_at?errorData.created_at:created_at,
    userData: errorData.userData?errorData.userData:null,
    appData: errorData.appData?errorData.appData:null,
    ip: errorData.ip?errorData.ip:null,
    route: errorData.route?errorData.route:null,
    error: errorData.error?{ status: errorData.error.status, name: errorData.error.name, description: errorData.error.stack }:null,
    ...errorData.aditional
  })
  return true;
}

module.exports.register = register;


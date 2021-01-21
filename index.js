const winston = require('winston')
const dayjs = require('dayjs')


const dateNameFile = dayjs().format('DD-MM-YYYY')
const created_at = dayjs().format('YYYY-MM-DD HH:mm:ss')

const register = async(level, error, auditPayload) => {
  const logger = winston.createLogger({
    defaultMeta: { app: 'Logger-Service'},
    format: winston.format.json(),
    transports: [
      new winston.transports.File({
        name: 'error-file',
        level: 'error',
        filename: 'logs/'+dateNameFile+'-error.log'
      }),
      new winston.transports.File({
        name: 'info-file',
        level: 'info',
        filename: 'logs/'+dateNameFile+'-info.log'
      })
    ],
  });
  const userData = await getUser(auditPayload)
  logger.log({
    level: level,
    date: created_at,
    user: userData,
    error: { status: error.status, name: error.name, description: error.stack }
  })
}

const getUser = async(auditPayload) => {
  try {
    if(!auditPayload.user){
      return null;
    }
    const user = auditPayload.user;
    return {id: user.id, name: user.name, email: user.email }
  } catch (error) {
    return null;
  }
}

module.exports.register = register;

// register(
//     'error', 
//     {status:"error", name: "NomeErro",  stack: "Erros"}, 
//     {id: 1, name: "Andersneto", email: "andersneto@gmail.com" }
// )




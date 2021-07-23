module.exports = {
  port: process.env.PORT || 8080,
  databaseURL: process.env.DATABASE_URL || '',
  env: process.env.NODE_ENV || 'development',
  log: {
    error: process.env.LOG_ERROR == undefined || process.env.LOG_ERROR.toLowerCase() == 'true',
    warn: process.env.LOG_WARN == undefined || process.env.LOG_WARN.toLowerCase() == 'true',
    info: process.env.LOG_INFO == undefined || process.env.LOG_INFO.toLowerCase() == 'true',
    debug: process.env.LOG_DEBUG == undefined || process.env.LOG_DEBUG.toLowerCase() == 'true',
  }
}

import morgan, { StreamOptions } from 'morgan';

import Logger from '../lib/logger';

const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message)
}

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
}

// Build the morgan middleware
const morganMiddleware = morgan(
  // Custom format message
  //':method :url :status :res[content-length] - :response-time ms',
  ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" - :status :res[content-length]  - :response-time ms',
  { stream, skip }
)

export default morganMiddleware;
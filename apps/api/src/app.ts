import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
// import fileUpload from 'express-fileupload';
import envConfig, { packageJson } from './configs/config';
import { initializeTrpc } from './trpc/router';
import morgan from './configs/morgan';
import ApiError from './utils/ApiError';
import { errorConverter, errorHandler } from './middleware/error';
import { rateLimiter } from './middleware/rateLimiter';
import { sseEventsHandler } from './controllers/sseEvents.controller';

const app = express();
// parse authentication cookies
app.use(cookieParser());

const corsOptions = {
  origin: envConfig.FRONTEND_URLS.split(','),
  methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],    
  allowedHeaders: [ 'Content-Type', 'authorization', 'app_version' ],
  credentials: true
};

if (envConfig.NODE_ENV !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
};

// set security HTTP headers
app.use(helmet());
  
// parse json request body
app.use(express.json());
  
// parse urlencoded request body
// app.use(express.urlencoded({ 
//   extended: true,
//   limit: '50mb'
// }));

// for parsing multipart/form-data
// app.use(fileUpload());
// app.use(express.static('public'));
  
// gzip compression
app.use(compression());

// enable cors
app.use(cors(corsOptions));

// rate limit to 20 errors in 2 minutes
app.use(rateLimiter);

app.get('/',(_req,res)=>{
    res.json({
      backendVersion: packageJson.version
    });
});

app.use('/server-side-events', sseEventsHandler);
// console path of all requests;
// app.use((req, res, next) => {
//   console.log(req.path);
//   next();
// })

// trpc
initializeTrpc(app);

// send back a 404 error for any unknown api request
app.use((req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found', false, '', `path: ${req.path}`));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
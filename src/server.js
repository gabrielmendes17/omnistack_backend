import 'dotenv/config';

import express from 'express';
import Youch from 'youch';
import routes from './routes';
import mongoose from 'mongoose';
import * as DATA_BASE_CONFIG from '../src/config/database';

class App {
  constructor () {
    mongoose.connect(DATA_BASE_CONFIG.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.routes()
    this.exception()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(express.json())
    this.express.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Accept, Accept-Language, Content-Language, Content-Type')
      res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, application/json')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
      next();
    });
  }

  routes () {
    this.express.use(routes)
  }

  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err && process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }
    })
  }
}

export default new App().express
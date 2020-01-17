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
      useUnifiedTopology: true,
      useCreateIndex: true,
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
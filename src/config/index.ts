// * general configuration object
import app from './app.config'
import database from './database.config'
import graphql from './graphql.config'
import jwt from './jwt.config'

export const main = [app, database, graphql, jwt]

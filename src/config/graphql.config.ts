import { registerAs } from '@nestjs/config'
import { GqlModuleOptions } from '@nestjs/graphql'
import depthLimit = require('graphql-depth-limit')

// * configuration object for the graphql module
export default registerAs(
  'graphql',
  (): GqlModuleOptions => ({
    autoSchemaFile: process.env.GRAPHQL_SCHEMA_FILE,
    playground: process.env.GRAPHQL_PLAYGROUND === 'true',
    context: ctx => ctx,
    installSubscriptionHandlers: true,
    validationRules: [depthLimit(parseInt(process.env.GRAPHQL_DEPTH_LIMIT, 10))],
  }),
)

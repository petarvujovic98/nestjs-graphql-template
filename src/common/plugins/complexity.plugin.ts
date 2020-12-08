import { GraphQLSchemaHost, Plugin } from '@nestjs/graphql'
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base'
import { GraphQLError } from 'graphql'
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity'

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  requestDidStart(): GraphQLRequestListener {
    const { schema } = this.gqlSchemaHost

    return {
      didResolveOperation({ request: { operationName, variables }, document }) {
        const complexity = getComplexity({
          schema,
          operationName,
          variables,
          query: document,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        })
        if (complexity >= 20) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: 20`,
          )
        }

        console.log('Query Complexity:', complexity)
      },
    }
  }
}

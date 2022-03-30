import express  from 'express'
import { graphqlHTTP } from 'express-graphql'
import { typeDefs } from './graphql'
import {resolvers} from './graphql/resolvers/index'
import { getContext } from './utils/getContext'
const expressPlayground =
    require('graphql-playground-middleware-express').default;

const app = express()


app.use('/graphql',  graphqlHTTP(async(req : any)=>{
    return {
        schema: typeDefs,
        rootValue: resolvers,
        graphiql: true,
        context: ()=>  getContext(req)
    }
}))

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

app.listen(4000)
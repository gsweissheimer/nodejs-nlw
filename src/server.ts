import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { registerRoutes } from './routes/'
import initializeSocketServer from './websockets/socketServer'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Configura compiladores de validação e serialização
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Configuração do Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Cat Dog Identification API',
      version: '0.1.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// CORS global para Fastify
app.register(fastifyCors, {
  origin: [
    'http://localhost:3002',
    'https://react-nlw-production.up.railway.app',
  ],
  credentials: true,
})

// Health check
app.get('/ping', async () => {
  return 'pong'
})

// Registra as rotas da aplicação
registerRoutes(app)

// Inicia o servidor
app
  .listen({ port: Number(process.env.PORT) || 3001, host: '0.0.0.0' })
  .then(() => {
    console.log('Server is running on port 3001')
    initializeSocketServer(app.server) // inicializa socket.io após o servidor HTTP estar pronto
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

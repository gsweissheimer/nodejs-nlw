import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
    type ZodTypeProvider,
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler
} from "fastify-type-provider-zod";

import {
  registerRoutes
} from './routes/'
import initializeSocketServer from './websockets/socketServer'


const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Cat Dog Identification API",
            version: "0.1.0",
        },
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.register(fastifyCors, {
    origin: true,
});

app.get("/ping", () => {
  return 'pong';
})


registerRoutes(app)

app.listen({ port: Number(process.env.PORT as string) }).then(() => {
  console.log('Server is running on port 3001')
  initializeSocketServer(app.server)
})
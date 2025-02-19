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

import { env } from "./env";
import {
  acessInviteLinkRoute,
  getRankingRoute,
  getSubscriberInvitesClicksRoute,
  getSubscriberInvitesCountRoute,
  getSubscriberRankingPositionRoute,
  subscribeToEventRoute
} from './routes/index'

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

app.register(subscribeToEventRoute);
app.register(acessInviteLinkRoute)
app.register(getSubscriberInvitesClicksRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running on port 3001");
});
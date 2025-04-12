import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";
import { generateToken, verifyUserNameAndPassword } from '../../functions/index'
import type { User } from '../../models/user'

export interface Response {
  hasError: boolean
  message: string
  user?: User
}

export const loginRoute: FastifyPluginAsyncZod = async app => {
  console.log('*** INÍCIO: Executando plugin loginRoute MÍNIMO ***')
    app.post(
      '/login',
      {
        schema: {
          summary: 'Login Route',
          description: 'Route to get token to authenticate request.',
          tags: ['auth'],
          body: z.object({
            username: z.string(),
            password: z.string(),
          }),
          response: {
            201: z.object({
              token: z.string(),
            }).passthrough(),
          },
        },
      },
      async (request, reply) => {
        const { username, password } = request.body;

        const response: Response = await verifyUserNameAndPassword(
          username,
          password
        )

        if (response.hasError || response.user == null)
          throw new Error(response.message)

        const token = generateToken(response.user);
        if (!token) throw new Error("Failed to generate token");

        return reply.status(201).send(token)

      }
    )
}

import bcrypt from 'bcrypt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";
import { createTutor, createUser } from '../../functions/'
import type { Response, Tutor, User } from '../../models/'

export const siginRoute: FastifyPluginAsyncZod = async app => {
    app.post(
      '/sigin',
      {
        schema: {
          summary: 'Sigin Route',
          description: 'Route to insert new user.',
          tags: ['auth'],
          body: z.object({
            password: z.string(),
            name: z.string(),
            cpf: z.string(),
            email: z.string(),
          }),
          response: {
            201: z.object({
              user: z.object({
                id: z.string(),
                username: z.string(),
                password: z.string(),
                tutorId: z.string(),
                createdAt: z.string(),
                updatedAt: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { password, name, cpf, email } = request.body

        const tutorResponse: Response<Tutor> = await createTutor(name, cpf, email)

        if (tutorResponse.hasError || tutorResponse.data?.id == null)
          throw new Error(tutorResponse.message)

        const hashedPassword = await bcrypt.hash(password, 12)

        const userResponse: Response<User> = await createUser(
          email,
          hashedPassword,
          tutorResponse.data?.id
        )

        if (userResponse.hasError || userResponse.data == null)
          throw new Error(userResponse.message)

        return reply.status(201).send({ 
          user: {
            ...userResponse.data,
            tutorId: userResponse.data.tutorId ?? '',
            createdAt: userResponse.data.createdAt.toISOString(),
            updatedAt: userResponse.data.updatedAt?.toISOString() ?? ''
          }
        })
      }
    )
}

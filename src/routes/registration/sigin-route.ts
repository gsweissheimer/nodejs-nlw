import bcrypt from 'bcrypt'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from "zod";
import { createTutor, createUser } from '../../functions/'
import type { Tutor, User } from '../../models/'

export interface TutorResponse {
  hasError: boolean
  message?: string
  tutor?: Tutor
}

export interface UserResponse {
  hasError: boolean
  message?: string
  user?: User
}

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

        const tutorResponse: TutorResponse = await createTutor(name, cpf, email)

        if (tutorResponse.hasError || tutorResponse.tutor?.id == null)
          throw new Error(tutorResponse.message)

        const hashedPassword = await bcrypt.hash(password, 12)

        const userResponse: UserResponse = await createUser(
          email,
          hashedPassword)

        if (userResponse.hasError || userResponse.user == null)
          throw new Error(userResponse.message)

        return reply.status(201).send({ 
          user: {
            ...userResponse.user,
            tutorId: userResponse.user.tutorId ?? '',
            createdAt: userResponse.user.createdAt.toISOString(),
            updatedAt: userResponse.user.updatedAt?.toISOString() ?? ''
          }
        })
      }
    )
}

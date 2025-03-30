import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { archivePetById } from '../../functions/'
import type { Pet, Response } from '../../models/'
import { deletePetSchema } from '../../schemas/'

export const deletePet: FastifyPluginAsyncZod = async app => {
  app.put('/pet/delete/:id', { schema: deletePetSchema }, async (request, reply) => {

      const { id } =
        request.params
      
      const res: Response = await archivePetById(id)

      if (res.hasError || res.data == null) {
        throw new Error(res.message)
      }

      return reply.send(res)
    }
  )
}

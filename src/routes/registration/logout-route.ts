import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { z } from "zod";

export const logoutRoute: FastifyPluginAsyncZod = async app => {
    app.post(
      '/logout',
      {
        schema: {
          summary: 'Logout Route',
          description: 'Route to logout and invalidate the token.',
          tags: ['auth'],
          response: {
            200: z.object({
              message: z.string(),
            }).passthrough(),
          },
        },
      },
      async (request, reply) => {
        // Here you would typically invalidate the token, e.g., by removing it from a database or cache
        // For simplicity, we'll just send a success message

        return reply.status(200).send({ message: 'Logged out successfully' });
      }
    )
}
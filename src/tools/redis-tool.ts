import { tool } from "ai"
import z from "zod"
import { pg } from "../drizzle/client"


export const redisTool = tool({
          description: `
            Realize consultas no redis para buscar informações, como: numeros de cliques nos links, indicações e convites dos usuários.
            Só pode ser usada para buscar dados e não pode executar comandos de escrita.
            os hashs são:
            referral:access-count 
            `.trim(),
          parameters: z.object({
            query: z.string().describe('A query SQL a ser executada.'),
            params: z.array(z.string()).describe('Os parâmetros da query SQL.'),
          }),
          execute: async ({ query, params }) => {

            const result = await pg.unsafe(query, params)

            return JSON.stringify(result)
          },
        })
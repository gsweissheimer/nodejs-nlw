import { tool } from "ai"
import z from "zod"
import { pg } from "../drizzle/client"


export const postgresTool = tool({
  description: `
            Realize consultas SQL (SELECT) no banco. 
            **Não pode** modificar dados (UPDATE, DELETE, INSERT).
            Tabelas disponíveis:
            - **user_record** (id, username, password, tutor_id, created_at, updated_at)
            - **tutor** (id, name, cpf, email, is_active, created_at, updated_at)
            - **pet** (id, name, type, breed_id, tutor_id, birth_date, microchip, is_active, angel, created_at, updated_at)
            Retorne no máximo 50 registros por vez.
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
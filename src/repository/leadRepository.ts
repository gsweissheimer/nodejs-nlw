import type { QueryResult } from 'mysql2'
import { pool } from '../db'

export interface Lead {
  id: number
  name: string
  tutorId: string
  isActive: boolean
}

export const getLeads = async (): Promise<Lead[]> => {
  const [rows] = await pool.query<QueryResult>(
    `select * from lead
        where a_b_landingpage = 'form-guia-pratico-de-paginas-web-ebook-gratis'
        and created_at > '2025-05-03 14:20:03'
        order by id desc;`
  )

  return rows as Lead[]
}

import type { QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2'
import { pool } from '../db'
import type { Lead } from '../models/'

export const getLeads = async (): Promise<Lead[]> => {
  const [rows] = await pool.query<QueryResult>(
    `select * from lead
        where a_b_landingpage = 'form-guia-pratico-de-paginas-web-ebook-gratis'
        and created_at > '2025-05-03 14:20:03'
        order by id desc;`
  )

  return rows as Lead[]
}

export const createLeadRepository = async (lead: Lead): Promise<Lead> => {
  const [result] = await pool.query<ResultSetHeader>(
    `insert into lead (name, email, phone, a_b_landingpage, created_at)
        values ('${lead.name}', '${lead.email}', '${lead.phone}', '${lead.aBLandingpage}', '${lead.createdAt}');`
  )

  lead.id = result.insertId.toString();
  
  return lead as Lead
}

export const deleteLeadByIdRepository = async (id: number): Promise<boolean> => {
  const [rows] = await pool.query<QueryResult>(
    `delete from lead where id = ${id};`
  )

  return true 
}
import dotenv from 'dotenv'
import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY as string

interface AuthPayload {
    userId: string
    email: string
}

declare module 'fastify' {
    interface FastifyRequest {
        user?: AuthPayload
    }
}

export const authenticateUser = async (
    req: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        reply.status(401).send({ message: 'Token não fornecido.' })
        return
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        reply.status(401).send({ error: 'Token não fornecido' })
        return
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as AuthPayload
        req.user = decoded
    } catch (err) {
        reply.status(403).send({ message: 'Token inválido ou expirado.' })
        return
    }
}

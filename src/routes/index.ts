import type { FastifyInstance } from 'fastify'

import { authenticateUser } from '../middleware/authenticator'

import { loginRoute } from './registration/login-route'
import { siginRoute } from './registration/sigin-route'
import { acessInviteLinkRoute } from './subscription/access-invite-link-route'
import { getRankingRoute } from './subscription/get-ranking-route'
import { getSubscriberInvitesClicksRoute } from './subscription/get-subscriber-invites-clicks-route'
import { getSubscriberInvitesCountRoute } from './subscription/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './subscription/get-subscriber-ranking-position-route'
import { subscribeToEventRoute } from './subscription/subscribe-to-event-route'

import { createPet } from './pet/create-pet'
import { deletePet } from './pet/delete-pet'
import { getPetById } from './pet/get-pet-by-id'
import { getPetsByTutorId } from './pet/get-pets-by-tuto-id'
import { updatePet } from './pet/update-pet'

import { sendMessageToAI } from './ai/send-message-route'

import { getUserFullBFF } from './user/get-user-full'

import { RoutesType } from '../enums/routes'

import { createEvent } from './event/create-event'
import { deleteEvent } from './event/delete-event'
import { getEventsByTutorId } from './event/get-event'
import { getEventsByPetId } from './event/get-event'

import { addLead } from './lead/create-lead'
import { getAllLeads } from './lead/get-lead'

const publicRoutes = [
  subscribeToEventRoute,
  acessInviteLinkRoute,
  getSubscriberInvitesClicksRoute,
  getSubscriberInvitesCountRoute,
  getSubscriberRankingPositionRoute,
  getRankingRoute,
  loginRoute,
  siginRoute,
  sendMessageToAI,
]

const authRoutes = [
  getAllLeads,
  addLead,
  createPet,
  deletePet,
  updatePet,
  getPetsByTutorId,
  getUserFullBFF,
  createEvent,
  deleteEvent,
  getPetById,
  getEventsByTutorId,
  getEventsByPetId,
]

export function registerRoutes(app: FastifyInstance) {
  for (const route of publicRoutes) {
    app.register(route, { prefix: `/${RoutesType.PUBLIC_ROUTES_PREFIX}` })
  }
  for (const route of authRoutes) {
    app.register(
      async (privateApp) => {
        privateApp.addHook('preHandler', authenticateUser)
        privateApp.register(route)
      },
      { prefix: `/${RoutesType.AUTH_ROUTES_PREFIX}` }
    )
  }
}
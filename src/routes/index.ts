import type { FastifyInstance } from 'fastify'
import { acessInviteLinkRoute } from './subscription/access-invite-link-route'
import { getRankingRoute } from './subscription/get-ranking-route'
import { getSubscriberInvitesClicksRoute } from './subscription/get-subscriber-invites-clicks-route'
import { getSubscriberInvitesCountRoute } from './subscription/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from './subscription/get-subscriber-ranking-position-route'
import { subscribeToEventRoute } from './subscription/subscribe-to-event-route'

import { loginRoute } from './registration/login-route'

import { siginRoute } from './registration/sigin-route'


export function registerRoutes(app: FastifyInstance) {
  app.register(subscribeToEventRoute)
  app.register(acessInviteLinkRoute)
  app.register(getSubscriberInvitesClicksRoute)
  app.register(getSubscriberInvitesCountRoute)
  app.register(getSubscriberRankingPositionRoute)
  app.register(getRankingRoute)

  app.register(loginRoute)
  app.register(siginRoute)
}
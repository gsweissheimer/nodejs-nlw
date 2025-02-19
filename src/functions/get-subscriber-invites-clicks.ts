import { redis } from "../redis/client"

interface GetSubscriberInvitesClicks {
    subscriberId: string,
}

export async function getSubscriberInvitesClicks({
  subscriberId,
}: GetSubscriberInvitesClicks) {

  const count = await redis.hget('referral:access-count', subscriberId)

  return { count: count ? Number.parseInt(count) : 0 }
}
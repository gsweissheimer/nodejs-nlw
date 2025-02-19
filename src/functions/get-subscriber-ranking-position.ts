import { eq } from "drizzle-orm"
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"
import { redis } from "../redis/client"

interface GetSubscriberRankingPosition {
    subscriberId: string,
}

export async function getSubscriberRankingPosition({
  subscriberId,
}: GetSubscriberRankingPosition) {

  const rank = await redis.zrevrank('referral:ranking', subscriberId)
  
  if (rank === null) {
      return { position: null }
    }

  return { position: rank + 1 }
}
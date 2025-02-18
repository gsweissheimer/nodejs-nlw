import { redis } from "../redis/client"

interface AccessInviteLinksParams {
  subscriberId: string
}

export async function accessInviteLinks({ subscriberId }: AccessInviteLinksParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
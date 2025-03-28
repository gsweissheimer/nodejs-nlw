
import type { Family, Tutor, User, UserFull } from '../../models/'
import {
  GetFamilyUsersByFamilyIdRepository,
  GetTutorByUserIdRepository,
  getFamilyByTutorIdRepository,
  getPetsByTutorIdRepository,
  getUserByIdRepository,
} from '../../repository'

import { safeExecute } from '../../utils/safeExecute'

export const getUserBFF = async (uuid: string) =>
  safeExecute(() => getUserFull(uuid), 'Can not get user.')

const getUserFull = async (uuid: string): Promise<UserFull> => {
  const user = await getUserByIdRepository(uuid)
  if (!user) throw new Error('User not found')

  const userFull: UserFull = {
    id: user.id,
    email: user.username,
    tutorId: user.tutorId,
  }

  if (!user.tutorId) throw new Error('User has no tutor')

  const tutor: Tutor = await GetTutorByUserIdRepository(user.tutorId)
  if (!tutor || !tutor.id) throw new Error('Tutor not found')

  userFull.name = tutor.name
  userFull.pets = await getPetsByTutorIdRepository(tutor.id)

  const family = await getFamilyByTutorIdRepository(tutor.id)
  if (!family) throw new Error('Family not found')

  userFull.family = {
    name: family.name,
    users: await GetFamilyUsersByFamilyIdRepository(family.id, tutor.id),
  }
  
  await Promise.all(
    userFull.family.users.map(async (familyUser) => {
      if (familyUser.id && familyUser.tutorId) {
        familyUser.pets = await getPetsByTutorIdRepository(familyUser.tutorId)
      }
    })
  )

  return userFull
}


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

const getUserFull = async (uuid: string) => {

    const user: User = await getUserByIdRepository(uuid)

    if (!user) {
      return { hasError: true, message: 'User not found' }
    }

    const userFull: UserFull = {
        id: user.id,
        email: user.username,
        tutorId: user.tutorId,
    }

    if (!user.tutorId) {
      return { hasError: true, message: 'User has no tutor' }
    }
    const tutor: Tutor = await GetTutorByUserIdRepository(user.tutorId)

    if (!tutor) {
      return { hasError: true, message: 'Tutor not found' }
    }

    if (tutor.id) {
        userFull.name = tutor.name
        userFull.pets = await getPetsByTutorIdRepository(tutor.id)
    } else {
      return { hasError: true, message: 'Tutor ID is undefined' }
    }

    const family: Family = await getFamilyByTutorIdRepository(tutor.id)

    if (!family) {
      return { hasError: true, message: 'family not found' }
    }

    userFull.family = {
      name: family.name,
      users: await GetFamilyUsersByFamilyIdRepository(family.id, tutor.id),
    }
    
    if (userFull.family.users) {
      await Promise.all(
        userFull.family.users.map(async (user: UserFull) => {
          if (user.id != null) {
            if (user.tutorId) {
              user.pets = await getPetsByTutorIdRepository(user.tutorId)
            } else {
              return { hasError: true, message: 'Tutor ID is undefined' }
            }
          }
        })
      )
    }

    return {hasError: false, user: userFull}
}
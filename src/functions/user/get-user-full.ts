
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
      throw new Error('User not found')
    }

    const userFull: UserFull = {
        id: user.id,
        email: user.username,
    }

    const tutor: Tutor = await GetTutorByUserIdRepository(user.id)

    if (!tutor) {
      throw new Error('Tutor not found')
    }

    if (tutor.id) {
        userFull.name = tutor.name
        userFull.pets = await getPetsByTutorIdRepository(tutor.id)
    } else {
      throw new Error('Tutor ID is undefined')
    }

    const family: Family = await getFamilyByTutorIdRepository(tutor.id)

    if (!family) {
      throw new Error('family not found')
    }

    userFull.family = {
      name: family.name,
      users: await GetFamilyUsersByFamilyIdRepository(tutor.id, family.id),
    }
    
    if (userFull.family.users) {
      await Promise.all(
        userFull.family.users.map(async (user: UserFull) => {
          if (user.id != null) {
            if (tutor.id) {// corrigir multiplas validações
              user.pets = await getPetsByTutorIdRepository(tutor.id)
            } else {
              throw new Error('Tutor ID is undefined')
            }
          }
        })
      )
    }

    return {hasError: false, user: userFull}
}
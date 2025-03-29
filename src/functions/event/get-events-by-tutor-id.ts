
import {
  getFamilyByTutorId,
  getPetsByFamilyId,
  getPetsByTutorId,
} from '../../functions/'
import type { Event, Family, Pet, Response } from '../../models/'
import {
  getEventsByPetIdRepository,
  getEventsByTutorIdRepository,
  getFamilyEventsByFamilyIdRepository,
  getTutorFamilyEventsByTutorIdRepository
} from '../../repository'
import { safeExecute } from '../../utils/safeExecute'

export const getEventsByTutorId = async (tutorId: string) =>
  safeExecute(() => getEventsByTutorIdFunction(tutorId), 'Can not get events.')

const getEventsByTutorIdFunction = async (tutorId: string) => {

  const res: Event[] = await getEventsByTutorIdRepository(tutorId)
  
  console.log(res)
  
  const family: Response<Family> = await getFamilyByTutorId(tutorId)

  if (family.hasError || family.data == null) {
    return []
  }

  const familyEvents: Event[] = await getFamilyEventsByFamilyIdRepository(family.data.id)

  const tutorFamilyEvents: Event[] =
    await getTutorFamilyEventsByTutorIdRepository(family.data.id)

  const myPets: Response<Pet[]> = await getPetsByTutorId(tutorId)

  if (myPets.hasError || myPets.data == null) {
    return []
  }

  const pets: Pet[] = myPets.data

  const familyPets: Response<Pet[]> = await getPetsByFamilyId(family.data.id)

  if (familyPets.hasError || familyPets.data == null) {
    return []
  }

  pets.push(...familyPets.data)

  const petsIds: string[] = pets.map(pet => pet.id).filter((id): id is string => id !== undefined)

  const petEvents: Event[] = await getEventsByPetIdRepository(petsIds)

  res.push(...familyEvents)
  res.push(...tutorFamilyEvents)
  res.push(...petEvents)
  
  return res
}
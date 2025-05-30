
import {
  getFamilyByTutorId,
  getPetById,
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

export const getEventsByPetId = async (petId: string) =>
  safeExecute(() => getEventsByPetIdRepository(petId), 'Can not get events.')

const getEventsByTutorIdFunction = async (tutorId: string) => {

  const res: Event[] = await getEventsByTutorIdRepository(tutorId)
    
  const family: Response<Family> = await getFamilyByTutorId(tutorId)

  if (family.hasError || family.data == null) {
    return []
  }

  if (family.data.tutorId !== tutorId) {
    const familyOwnerEvents: Event[] = await getEventsByTutorIdRepository(
      family.data.tutorId
    )

    res.push(...familyOwnerEvents)
  }

  const familyEvents: Event[] = await getFamilyEventsByFamilyIdRepository(family.data.id)

  const tutorFamilyEvents: Event[] =
    await getTutorFamilyEventsByTutorIdRepository(family.data.id, tutorId)

  const myPets: Response<Pet[]> = await getPetsByTutorId(tutorId)

  if (myPets.hasError || myPets.data == null) {
    return []
  }

  const pets: Pet[] = myPets.data

  const familyPets: Response<Pet[]> = await getPetsByFamilyId(family.data.id)

  if (familyPets.hasError || familyPets.data == null) {
    return []
  }

  if (family.data.tutorId !== tutorId) {

    const ownerPets: Response<Pet[]> = await getPetsByTutorId(family.data.tutorId)

    if (ownerPets.hasError || ownerPets.data == null) {
      return []
    }

    pets.push(...ownerPets.data)

  }

  pets.push(...familyPets.data)

  const petsIds: string[] = pets.map(pet => pet.id).filter((id): id is string => id !== undefined)

  const petEvents: Event[] = await getEventsByPetIdRepository(petsIds)

  res.push(...familyEvents)

  res.push(...tutorFamilyEvents)

  res.push(...petEvents)

  for (const event of res) {
    if (event.entityType === 'pet') {
      const petResponse = await getPetById(event.entityId)
      event.tooltip = petResponse.data?.name ?? 'Unknown'
    } else {
      event.tooltip = 'Desconhecido'
    }
  }

  return res
}
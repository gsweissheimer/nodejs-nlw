import { EntityType, EntityTypeEnum, Event, EventType, EventTypeEnum } from './event'
import { Family, FamilyFull } from './family'
import { Pet } from './pet'
import { Tutor } from './tutor'
import { User, UserFull } from './user'
export {
  Tutor,
  User,
  UserFull,
  Pet,
  Family,
  FamilyFull,
  Event,
  EventType,
  EntityType,
  EventTypeEnum,
  EntityTypeEnum,
}
export interface Response<T = unknown> {
    hasError: boolean
    message?: string
    data?: T
}
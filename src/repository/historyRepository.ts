import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client";
import { petHistory } from "../drizzle/schema/pet_history";
import { HistoryItem } from '../models';

export const GetHistoriesByPetIdRepository = async (
  id: string
): Promise<HistoryItem[]> => {
  const petHistoryItens: HistoryItem[] = await db.select().from(petHistory).where(eq(petHistory.petId, id))
  return petHistoryItens;
}

export const CreateHistoryRepository = async (petHistoryItem: HistoryItem): Promise<HistoryItem> => {
  const [created] = await db.insert(petHistory).values({
    petId: petHistoryItem.petId!,
    eventDate: petHistoryItem.eventDate instanceof Date ? petHistoryItem.eventDate : new Date(petHistoryItem.eventDate), 
    eventType: petHistoryItem.eventType as typeof petHistory.$inferInsert['eventType'],
    eventTypeLabel: petHistoryItem.eventTypeLabel,
    name: petHistoryItem.name,
    createdAt: new Date(),
  }).returning();
  return created;
}

export const DeleteHistoryItemByIdRepository = async (id: string): Promise<boolean> => {
  await db.delete(petHistory).where(eq(petHistory.id, id))

  return true 
}
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
"use server";
import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { todo, users } from "@/db/schema";
export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addUser=async(user:any)=>{
    await db.insert(users).values({
        clerkId: user?.clerkId,
      email: user?.email,
      name: user?.name,
      firstName: user?.firstName,
      lastName: user?.lastName,
      photo: user?.photo,
    }).returning({ clerkClientId: users?.clerkId });
}
export const getUser=async (id: number) => {
  const user= await db.select().from(users).where(eq(users.id, id));
 

  return user;
};
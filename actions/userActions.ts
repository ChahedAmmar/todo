"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { todos, users } from "@/db/schema";

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addUser = async (user: any) => {
  await db.insert(users).values({
    clerkId: user?.clerkId,
    email: user?.email,
    name: user?.name,
    firstName: user?.firstName,
    lastName: user?.lastName,
    photo: user?.photo,
  }).returning({ clerkClientId: users?.clerkId });
}

// Updated getUser to include todos
export const getUser = async (clerkId: string) => {
  // First get the user
  const user = await db.select().from(users).where(eq(users.clerkId, clerkId));
  
  if (!user || user.length === 0) {
    return null;
  }

  // Then get the todos for this user
  const userTodos = await db.select().from(todos).where(eq(todos.userId, user[0].id));
  
  // Combine user data with todos
  return [{
    ...user[0],
    todos: userTodos
  }];
};
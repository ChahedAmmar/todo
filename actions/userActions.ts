/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

type ClerkData = {
  clerkId: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export const getUser = async ({
  clerkId,
  name,
  email,
  firstName,
  lastName,
  photo,
}: ClerkData) => {
  let user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.clerkId, clerkId),
    with: {
      todos: true,
    },
  });

  if (!user) {
    const newUser = await db.insert(users).values({
      clerkId,
      name,
      email,
      firstName,
      lastName,
      photo,
    }).returning();

    user = {
      ...newUser[0],
      todos: [],
    };
  }

  return user;
};



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addUser = async (user: any) => {
  await db
    .insert(users)
    .values({
      clerkId: user?.clerkId,
      email: user?.email,
      name: user?.name,
      firstName: user?.firstName,
      lastName: user?.lastName,
      photo: user?.photo,
    })
    .returning({ clerkClientId: users?.clerkId });

};
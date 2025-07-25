/* eslint-disable @typescript-eslint/no-explicit-any */
import { getData } from "@/actions/todoAction";
import {  getUser } from "@/actions/userActions";
import Todos from "@/components/todos";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return <div>Please sign in to view your todos.</div>;
  }

  const fetchedData = await getUser({
    clerkId: clerkUser.id,
    name: `${clerkUser.firstName} ${clerkUser.lastName}`,
    email: clerkUser.emailAddresses[0]?.emailAddress || "",
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    photo: clerkUser.imageUrl,
  });

  if (!fetchedData) return <div>Loading...</div>;

  return (
    <main className="flex items-center justify-between">
      <Todos todos={fetchedData.todos} user={fetchedData} />
    </main>
  );
}

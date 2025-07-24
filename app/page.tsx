
import { getData } from "@/actions/todoAction";
import Todos from "@/components/todos";
import { getAllUsers, getUser} from "@/actions/userActions"; // Assuming you have a function to get all users
export default async function Home() {
  const users= await getAllUsers();
  const user= await getUser(users[0].id); // Fetching a user with id 1, adjust as necessary
  console.log(users)
   // Assuming you have a function to get all users
 const data = await getData(users[0].id);
  return <Todos todos={data} user={user} />;
}


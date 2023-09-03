import PromisePool from "@supercharge/promise-pool";
import { useEffect, useState } from "react";

const USERS_URI = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState<User[]>();

  const getUsers = async (url: string): Promise<User[]> => {
    const response = await fetch(url);
    const users: User[] = await response.json();
    return users;
  };

  const getUser = async (url: string): Promise<User> => {
    const userResponse = await fetch(url);
    const user = await userResponse.json();
    return user;
  };

  useEffect(() => {
    const getUserNamesPool = async () => {
      const users = await getUsers(USERS_URI);

      const { results } = await PromisePool.for<User>(users)
        .withConcurrency(2)
        .process(async (user: User) => {
          return await getUser(`${USERS_URI}/${user.id}`);
        });

      setUsers(results);
    };

    getUserNamesPool();
  }, []);

  return (
    <div>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { getUsers } from "./api/user";
import { User } from "./entity/User";

function App() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const getUSer = async () => {
      const data = await getUsers();

      setUsers(data);
    };

    getUSer();
  }, []);
  return (
    <div>
      {users
        ? users.map((user, idx) => <div key={idx}> {user.email}</div>)
        : ""}
    </div>
  );
}

export default App;

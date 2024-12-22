import { BoardThemeProvider } from "./context/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";

function App() {
  // const [users, setUsers] = useState<User[]>();

  // useEffect(() => {
  //   const getUSer = async () => {
  //     const data = await getUsers();

  //     setUsers(data);
  //   };

  //   getUSer();
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <BoardThemeProvider>
        <RouterProvider router={router} />
      </BoardThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

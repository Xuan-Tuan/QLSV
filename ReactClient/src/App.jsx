import AuthProvider from "./authContext/authContext";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./route";
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={browserRouter} />
      </AuthProvider>
    </>
  );
}

export default App;

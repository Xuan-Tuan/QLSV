import { useAuth } from "../../controller/authController";
import { doSignOut } from "../../controller/authController";

export default function ParentPage() {
  const { currentUser } = useAuth();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Parent</h1>
      <h2>{currentUser.email}</h2>
      <button onClick={(e) => handleLogOut(e)}>Logout</button>
    </div>
  );
}

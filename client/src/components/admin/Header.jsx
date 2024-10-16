import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "@/store/authSlice";
import GetInitials from "@/config/GetInitials";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  
  const userEmail = useSelector((state) => state.auth.user.userName);

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
       
      </Button>
      <div className="flex flex-1 justify-end">
      <GetInitials name={userEmail}/>
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;

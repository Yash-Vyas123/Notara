import { Link, useNavigate } from "react-router";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/notara-logo.png"
              alt="Notara Logo"
              className="size-10 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Notara</h1>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-base-content/60 hidden sm:block">
                👋 {user.username}
              </span>
            )}
            <Link to="/create" className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="btn btn-ghost btn-sm"
              title="Logout"
            >
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

import { Link } from "react-router";
import {PlusIcon} from "lucide-react";
const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                  <img src="/notara-logo.png" alt="Notara Logo" className="size-10 object-contain group-hover:scale-110 transition-transform duration-200" />
                  <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Notara</h1>
                </Link>
                <div className="flex items-centre gap-4">
                    <Link to={"/create"} className="btn btn-primary" >
                    <PlusIcon className="size-5"/>
                    <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  );
};

export default NavBar;

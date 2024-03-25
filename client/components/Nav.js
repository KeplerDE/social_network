import { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from 'next/router';


const Nav = () => {
  const { state, setState } = useContext(UserContext);


  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem('auth');
    setState(null);
    router.push("/login")
  }
  return (
    <nav className="nav bg-dark d-flex justify-content-between">
      <Link href="/" className="nav-link text-light logo">
        HOME
      </Link>
      <Link href="/login" className="nav-link text-light"> 
        Login
      </Link>
      <Link href="/register" className="nav-link text-light">
        Register
      </Link>
      <a onClick={logout} className="nav-link text-light">
        Logout
      </a>
    </nav>
  );
};

export default Nav;

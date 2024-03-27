import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const { state, setState } = useContext(UserContext);

  useEffect(() => {
    if (process.browser) {
      setCurrent(window.location.pathname);
    }
  }, [process.browser && window.location.pathname]);



  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };


  return (
    <nav className="nav bg-dark d-flex justify-content-between">
      <Link href="/" className={`nav-link text-light logo ${current === "/" && "active"}`}>HOME</Link>
      {state !== null ? (
        <>
        <Link href="/user/dashboard" className={`nav-link text-light ${current === "/user/dashboard" && "active"}`}>

          { state && state.user && state.user.name}
        </Link>

        <a onClick={logout} className="nav-link text-light">
          Logout
        </a>
        </>
      ) : (
        <>
          <Link href="/login" className="nav-link text-light">
            Login
          </Link>
          <Link href="/register" className="nav-link text-light">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;

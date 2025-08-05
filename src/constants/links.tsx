import type { JSX } from "react";
import { Home } from "../pages/home";
import { Test } from "../pages/test";
import { Login } from "../pages/auth/login";
import { Logout } from "../pages/auth/logout";
import { Landing } from "../pages/landing";
import { ManageUser } from "../pages/user/manage";
import { CreateUser } from "../pages/user/create";

interface LinkProps {
    name: string;
    path: string;
    component: JSX.Element
}

export const NavbarLinks: LinkProps[] = [
    {
        name: "Home",
        path: "/",
        component: <Home/>
    },
    {
        name: "Test",
        path: "/test",
        component: <Test/>
    },
    {
        name: "Login",
        path: "/Login",
        component: <Login/>
    },
    {
        name: "Logout",
        path: "/Logout",
        component: <Logout/>
    },
    {
        name: "Landing",
        path: "/landing",
        component: <Landing/>
    },
];

export const ProtectedNavbarLinks: LinkProps[] = [
    {
        name: "Manage User",
        path: "/user",
        component: <ManageUser/>
    },
    {
        name: "Create User",
        path: "/user/create",
        component: <CreateUser/>
    },
];
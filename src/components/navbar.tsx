import type { FC } from "react";
import { Link } from "react-router-dom";
import { NavbarLinks } from "../constants/links";

interface Props {
    title?: string;
    data?: any; // optional prop
}

export const NavbarCustom: FC<Props> = ({ title, data }) => {
    console.log(title);
    console.log(data);
    return <div className="bg-stone-900 px-4 py-2 w-full flex flex-row justify-end">
        {
            NavbarLinks.map((url) => (
                <Link className="text-white m-2 p-2 rounded-md hover:underline" to={url.path}>{url.name}</Link>
            ))
        }
    </div>;
};
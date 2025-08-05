import type { FC } from "react";

interface Props {
    title?: string;
    data?: any; // optional prop
  }
  
export const Logout: FC<Props> = ({ title, data }) => {
    return <>
        <div>Logout Page: {title ?? "N/A"}! {data ?? "no data"}</div>
        <p>Text here</p>
        <div style={{ minHeight: "100dvh" }} />
    </>;
};
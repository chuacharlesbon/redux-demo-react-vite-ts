import type { FC } from "react";

interface Props {
    title?: string;
    data?: any; // optional prop
  }
  
export const Login: FC<Props> = ({ title, data }) => {
    return <>
        <div>Login Page: {title ?? "N/A"}! {data ?? "no data"}</div>
        <p>Text here</p>
        <div style={{ minHeight: "100dvh" }} />
    </>;
};
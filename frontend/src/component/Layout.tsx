import React, {ReactNode} from "react";

type Props = {
    children: ReactNode;
}
export default function Layout({children}: Props) {
    return (
        <>

            <main className={"main-content"}>
                {children}
            </main>
        </>
    );
}
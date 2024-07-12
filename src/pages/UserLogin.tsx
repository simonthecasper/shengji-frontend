// import React from "react";

import { useSetAtom } from "jotai";
import { nameAndConnectServer } from "../store/store.ts";
import { useRef } from "react";

function StartPage() {
    // const [input ] = useAtom(inputAtom)
    const setName = useSetAtom(nameAndConnectServer)
    const input = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (input.current) {
            setName(input.current.value)
        }
    }

    return <>
        <input name="username" ref={input} />
        <button onClick={handleClick}>Set Name</button>
    </>;
}

export default StartPage

// import React from "react";

import Button from "../components/Button.tsx";
import { useSetAtom } from "jotai";
import { nameAndConnectServer } from "../store/store.ts";
import { useRef } from "react";
import '../App.css'

function UserLogin() {
    // const [input ] = useAtom(inputAtom)
    const setName = useSetAtom(nameAndConnectServer)
    const input = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (input.current) {
            setName(input.current.value)
        }
    }

    return (
        <div className="userLogin">
            <input name="username" className="baseInput" ref={input} />
            <Button bg="primary" onClick={handleClick}>Set Name</Button>
        </div>
    )
}

export default UserLogin;

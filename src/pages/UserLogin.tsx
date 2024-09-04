// import React from "react";

import { useSetAtom } from "jotai";
import { nameAndConnectServer } from "../store/store.ts";
import { useRef } from "react";
import '../App.css'

function UserLogin() {
    const setName = useSetAtom(nameAndConnectServer)
    const input = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (input.current) {
            setName(input.current.value)
        }
    }

    return (
        <div className="userLogin">
            <h1>Set your username!</h1>
            <input name="username" className="baseInput" ref={input} />
            <button onClick={handleClick}>Set Name</button>
        </div>
    )
}

export default UserLogin;

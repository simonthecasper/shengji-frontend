// import React from "react";

import { initSocketConnection } from "../global/socket";

import { useAtom } from "jotai";
import { userAtom } from "../store/store.ts";
import { useState } from "react";

function StartPage() {

    const [user, setUser] = useAtom(userAtom);
    const [inputText, setInputText] = useState('');

    const usernameChange = (name: string) => {
        // setUsername(event.target.value);
        setInputText(name);
    };
    const setNameAndConnectServer = () => {
        if (inputText.length == 0) {
            alert("Please enter a username.");
            return;
        } else if (inputText.length > 20) {
            alert("Please enter a shorter username");
            return;
        } else {
            setUser(inputText)
        }
        console.log('username: ', user);

        initSocketConnection();
    };

    return <>
        <input name="username" value={inputText}
            onChange={(e) => { usernameChange(e.target?.value) }} />
        <button onClick={setNameAndConnectServer}>Set Name</button>
    </>;
}

export default StartPage

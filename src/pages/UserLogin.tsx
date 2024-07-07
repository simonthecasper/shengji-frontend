// import React from "react";

import { initSocketConnection } from "../global/socket";

import {useAtom} from "jotai";
import {userAtom} from "../store/store.ts";

function StartPage() {

    const  [user,setUser] = useAtom(userAtom);

    const usernameChange = (event: { target: { value: never } }) => {
        // setUsername(event.target.value);
        setUser({username: event.target.value});
    };
    const setNameAndConnectServer = () => {
        if (user.username.length == 0) {
            alert("Please enter a username.");
            return;
        } else if (user.username.length > 20) {
            alert("Please enter a shorter username");
            return;
        }
        console.log(user.username);

        initSocketConnection();
    };
    // @ts-ignore
    return <>
        <input name="username" value={user.username} onChange={usernameChange}/>
    <button onClick={setNameAndConnectServer}>Set Name</button>
    </>;
}

export default StartPage
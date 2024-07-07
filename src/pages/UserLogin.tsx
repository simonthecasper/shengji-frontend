// import React from "react";

import { initSocketConnection } from "../global/socket";

import { useAtom } from "jotai";
import { userAtom } from "../store/store.ts";

function StartPage() {

    const [user, setUser] = useAtom(userAtom);

    const usernameChange = (name: string) => {
        // setUsername(event.target.value);
        setUser(name);
    };
    const setNameAndConnectServer = () => {
        if (user.length == 0) {
            alert("Please enter a username.");
            return;
        } else if (user.length > 20) {
            alert("Please enter a shorter username");
            return;
        }
        console.log(user);

        initSocketConnection();
    };

    return <>

        <input name="username" value={user}
            onChange={(e)=>{usernameChange(e.target?.value) }}/>
        <button onClick={setNameAndConnectServer}>Set Name</button>
    </>;
}

export default StartPage

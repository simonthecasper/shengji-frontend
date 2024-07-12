// import React from "react";

import { useSetAtom } from "jotai";
import {  nameAndConnectServer  } from "../store/store.ts";
import { useRef } from "react";

function StartPage() {
    // const [input ] = useAtom(inputAtom)
    const setName = useSetAtom(nameAndConnectServer)
    const input = useRef(null)

    return <>
        <form action="">
        <input name="username" ref={input}/>
        <button onSubmit={ () => setName(input?.current)}></button>
        </form >
    </>;
}

export default StartPage

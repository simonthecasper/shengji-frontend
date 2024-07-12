// import React from "react";

import { useSetAtom } from "jotai";
import {  nameAndConnectServer  } from "../store/store.ts";
import { useRef } from "react";
import '../App.css'

function StartPage() {
    // const [input ] = useAtom(inputAtom)
    const setName = useSetAtom(nameAndConnectServer)
    const input = useRef(null)

    const onSubmit = () =>{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        setName(input?.current.value);
        
    }
    return <>
        <input name="username" ref={input}/>
        <button onClick={ onSubmit} > submit name</button>
    </>;
}

export default StartPage

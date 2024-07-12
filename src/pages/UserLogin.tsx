// import React from "react";

import { useAtom, useSetAtom } from "jotai";
import { inputAtom, nameAndConnectServer  } from "../store/store.ts";

function StartPage() {
    const [input, updateInput] = useAtom(inputAtom)
    const setName = useSetAtom(nameAndConnectServer)

    return <>
        <input name="username" value={input}
            onChange={ e => updateInput(e.target?.value)} />
        <button onClick={setName}>Set Name</button>
    </>;
}

export default StartPage

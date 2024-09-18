import { atom } from "jotai";
import { userPlayerIDAtom } from "./store";
import { PageState } from "../enums/PageState";
import { backButtonTextAtom, backButtonActiveAtom } from "./store";
import { nextButtonTextAtom, nextButtonActiveAtom } from "./store";
import { hostPlayerIDAtom } from "./store";

const pageStateListAtom = atom(PageState)

//login, connect_session, lobby
export const pageStateAtom = atom("login",
    (get, set, newState: string) => {
        const pageStateList = get(pageStateListAtom)
        if (pageStateList.includes(newState)) {
            set(pageStateAtom, newState)
        }

        if (get(pageStateAtom) === "lobby") {
            set(backButtonTextAtom, "Leave Lobby")
            set(backButtonActiveAtom, true)

            set(nextButtonActiveAtom, get(hostPlayerIDAtom) === get(userPlayerIDAtom))
            set(nextButtonTextAtom, get(nextButtonActiveAtom) ? "Configure Game" : "Button Disabled")

            console.log(get(backButtonTextAtom))
            console.log(get(nextButtonTextAtom))
        }
    }
);
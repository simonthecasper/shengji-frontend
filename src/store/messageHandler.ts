import { atom } from "jotai/vanilla";
import { useAtom } from "jotai";

import { sessionIDAtom } from "./store";
import { isInLobbyAtom } from "./store";
import { userPlayerIDAtom } from "./store";
import { playerAttributesAtom } from "./store";


export const messageHandlerAtom = atom(
	() => '',
	(get, set, message: string) => {

		console.log("Message received from server: ", message);

		let messageObject = JSON.parse(message);
		let stage = messageObject.stage;
		let task = messageObject.task;


		if (stage === "prelobby") {
			if (task === "join_session_ack") {
				if (get(sessionIDAtom) == "Unset") {
					let player_id = messageObject.player_id

					set(userPlayerIDAtom, player_id)
					set(sessionIDAtom, messageObject.session_id)
					set(isInLobbyAtom, true)
					
				}
			} else if (task === "join_session_not_found") {
                console.log(messageObject.message)
            }
		}
	}
);

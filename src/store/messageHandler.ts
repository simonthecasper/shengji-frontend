import { atom } from "jotai/vanilla";
import { useAtomValue } from "jotai";

import { sessionIDAtom } from "./store";
import { isInLobbyAtom } from "./store";
import { userPlayerIDAtom } from "./store";
import { playerAttributesAtom } from "./store";
import { hostPlayerIDAtom } from "./store";



export const messageHandlerAtom = atom(
	() => '',
	(get, set, message: string) => {
		console.log("Message received from server: ", message);
		const messageObject = JSON.parse(message);
		const stage = messageObject.stage;
		const task = messageObject.task;

		if (stage === "prelobby") {
			if (task === "join_session_ack") {
				if (get(sessionIDAtom) == "Unset") {
					const player_id = messageObject.player_id

					set(userPlayerIDAtom, player_id)
					set(sessionIDAtom, messageObject.session_id)
					set(isInLobbyAtom, true)
				}
			} else if (task === "join_session_not_found") {
                console.log(messageObject.message)
            } else if (task === "share_player_attributes") {
				set(playerAttributesAtom, messageObject.player_attributes)
			} else if (task === "broadcast_host_player") {
				const host_player_id = messageObject.host_player_id
				if (useAtomValue(hostPlayerIDAtom) != host_player_id) {
					set(hostPlayerIDAtom, host_player_id)
				}
			}
		}
	}
);

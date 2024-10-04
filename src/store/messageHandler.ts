import { atom } from "jotai/vanilla";

import { sessionIDAtom } from "./store";
import { userPlayerIDAtom } from "./store";
import { playerAttributesAtom } from "./store";
import { hostPlayerIDAtom } from "./store";
import { listOfPlayersAtom } from "./store";
import { pageStateAtom } from "./pageStateAtom";

export const messageHandlerAtom = atom(
	() => '',
	(get, set, message: string) => {
		console.log("Message received from server: ", message);
		const messageObject = JSON.parse(message);
		const stage = messageObject.stage;
		const task = messageObject.task;

		if (stage === "prelobby") {
			if (task === "join_session_ack") {
				if (get(sessionIDAtom) === "") {
					set(userPlayerIDAtom, messageObject.player_id)
					set(sessionIDAtom, messageObject.session_id)

					if (get(pageStateAtom) === "connect_session") {
						set(pageStateAtom, "lobby")
					}
				}
			} else if (task === "join_session_not_found") {
				console.log(messageObject.message)
			}
		}

		if (stage === "lobby") {
			if (task === "share_player_attributes") {
				const player_attributes = messageObject.player_attributes
				console.log("incoming share_player_attributes message: ", player_attributes)
				set(playerAttributesAtom, player_attributes)

				const usernames: string[] = []
				Object.keys(player_attributes).forEach(function(key, _value) {
					usernames.push(key)
				});

				set(listOfPlayersAtom, usernames)

			} else if (task === "broadcast_host_player") {
				const host_player_id = messageObject.host_player_id
				if (get(hostPlayerIDAtom) != host_player_id) {
					set(hostPlayerIDAtom, host_player_id)
				}
			}
		}
	}
);

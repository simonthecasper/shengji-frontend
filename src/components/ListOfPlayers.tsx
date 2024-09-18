import {
    hostPlayerIDAtom,
    listOfPlayersAtom,
    playerAttributesAtom,
} from "../store/store";
import { useAtomValue } from "jotai";

const ListOfPlayers = () => {
    const listOfPlayers = useAtomValue(listOfPlayersAtom);
    const playerAttributes = useAtomValue(playerAttributesAtom);
    const hostPlayerID = useAtomValue(hostPlayerIDAtom);

    //TODO: implement styling
    return (
        <div>
            <ul>
                {listOfPlayers.map((player) => {
                    return (
                        <li key={player}>
                            {playerAttributes === null
                                ? ""
                                : playerAttributes[player]["username"].concat(
                                      hostPlayerID === player
                                          ? " (lobby host)"
                                          : ""
                                  )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListOfPlayers;

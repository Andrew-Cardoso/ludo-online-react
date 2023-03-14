import {createContext, ReactNode, useState} from 'react';
import {useSocket} from '../Socket/socket.hook';
import {PublishEventsEnum, SubscribeEventsEnum} from './game-events';
import {ColorEnum} from './interfaces/colors';
import {Game} from './interfaces/game';
import {ActionTuple} from './interfaces/pawn';

export interface GameContext {
	game: Game | null;
	gameEvents: GameEvents;
	playerId: string | null;
	backToMenu: () => void;
}

export interface GameEvents {
	start: () => Promise<void>;
	join: (id: string) => void;
	chooseColor: (color: ColorEnum) => void;
	roll: () => void;
	rollResult: () => void;
	event: (type: ActionTuple) => void;
	pawnMoved: () => void;
}

export const GameContext = createContext<GameContext>({
	game: null,
	playerId: null,
	gameEvents: {
		start: async () => {},
		join: () => {},
		chooseColor: () => {},
		roll: () => {},
		rollResult: () => {},
		event: () => {},
		pawnMoved: () => {},
	},
	backToMenu: () => {},
});

export const GameProvider = ({children}: {children: ReactNode}) => {
	const [game, setGame] = useState<Game | null>(null);
	const [playerId, setPlayerId] = useState<string | null>(null);
	const {connect, listen, send, disconnect} = useSocket();

	const handleGameUpdate = (game: Game) => setGame(game);

	const start = async () => {
		const id = await connect();
		if (!game) listen(SubscribeEventsEnum.GAME_UPDATED, handleGameUpdate);
		setPlayerId(id);
		send(PublishEventsEnum.CREATE_GAME);
	};
	const join = async (id: string) => {
		if (!playerId) {
			setPlayerId(await connect());
			listen(SubscribeEventsEnum.GAME_UPDATED, handleGameUpdate);
		}
		send(PublishEventsEnum.JOIN_GAME, id);
	};
	const chooseColor = (color: ColorEnum) => send(PublishEventsEnum.CHOOSE_COLOR, color);
	const roll = () => send(PublishEventsEnum.ROLL_DICE);
	const rollResult = () => {
		if (playerId === game?.current) send(PublishEventsEnum.ROLL_RESULT);
	};
	const pawnMoved = () => {
		if (playerId === game?.current) send(PublishEventsEnum.MOVED_PAWN);
	};
	const event = ([type, args]: ActionTuple) => send(type, args);
	const backToMenu = () => {
		disconnect();
		setGame(null);
		setPlayerId(null);
	};

	return (
		<GameContext.Provider
			value={{
				gameEvents: {start, chooseColor, roll, join, rollResult, event, pawnMoved},
				game,
				playerId,
				backToMenu,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

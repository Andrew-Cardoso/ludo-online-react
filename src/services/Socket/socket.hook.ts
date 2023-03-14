import {useEffect} from 'react';
import {io, Socket} from 'socket.io-client';
import {SOCKET_URL} from '../../env';
import {PublishEventsEnum, SubscribeEventsEnum} from '../Game/game-events';
import {useToast} from '../Toast/toast.hook';

let socket: Socket;
export const useSocket = () => {
	const subscribedEvents = new Set<SubscribeEventsEnum>();
	const toast = useToast();

	const disconnect = () => {
		if (!socket) return;
		subscribedEvents.forEach((event) => socket.off(event));
		socket.disconnect();
	};

	useEffect(() => {
		return () => {
			disconnect();
		};
	}, []);

	const connect = (): Promise<string> =>
		new Promise((resolve) => {
			socket = io(SOCKET_URL);
			socket.on('connect', () => {
				resolve(socket.id);
			});
		});
	const listen = (event: SubscribeEventsEnum, handler: (...x: any[]) => any) => {
		subscribedEvents.add(event);
		socket.on(event, handler);
	};
	const send = (event: PublishEventsEnum, data?: unknown) =>
		socket
			.emitWithAck(event, data)
			.then(
				(gameError?: {error: string}) =>
					gameError?.error && toast('warning', gameError.error),
			);

	return {connect, listen, send, disconnect};
};

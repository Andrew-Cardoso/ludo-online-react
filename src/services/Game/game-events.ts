export enum PublishEventsEnum {
	CREATE_GAME = 'game:create',
	JOIN_GAME = 'game:join',
	CHOOSE_COLOR = 'game:color',
	ROLL_DICE = 'game:roll',
	ROLL_RESULT = 'game:roll-result',
	MOVED_PAWN = 'game:moved',
}

export enum SubscribeEventsEnum {
	GAME_UPDATED = 'game:updated',
}

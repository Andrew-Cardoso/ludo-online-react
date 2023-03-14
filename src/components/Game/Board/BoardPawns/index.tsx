import {useContext, useEffect} from 'react';
import {createPortal} from 'react-dom';
import {GameContext} from '../../../../services/Game/game.context';
import {AnimationTypeEnum} from '../../../../services/Game/interfaces/animation-type';
import {ColorEnum, colors} from '../../../../services/Game/interfaces/colors';
import {KaryogamyMutation} from '../../../../services/Game/interfaces/karyogamy-mutation';
import {MitosisIdentifier} from '../../../../services/Game/interfaces/mitosis-identifier';
import {SquareId} from '../../../../services/Game/interfaces/pawn';
import {PawnIdentifier} from '../../../../services/Game/interfaces/pawn-identifier';
import {PawnSquarePositionEnum} from '../../../../services/Game/interfaces/pawn-square-position';
import {useResizeObserver} from '../../../../services/Resize/resize.hook';
import {Pawn} from '../../../Pawn';

const pawnId = (color: ColorEnum, index: number) => `game-pawn-${color}-${index}`;

const setScreenPosition = (el: HTMLElement, {top, left, size}: Rect) => {
	el.style.top = `${top}px`;
	el.style.left = `${left}px`;
	el.style.width = `${size}px`;
	el.style.height = `${size}px`;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Rect {
	size: number;
	top: number;
	left: number;
}
const getRect = (id: string): Rect => {
	const el = document.getElementById(id);
	if (!el) return {size: 0, top: 0, left: 0};

	const {left, top, width, height} = el.getBoundingClientRect();
	const size = Math.min(width, height);

	const leftOffset = (width - size) / 2;
	const topOffset = (height - size) / 2;

	return {
		size,
		left: left + leftOffset,
		top: top + topOffset,
	};
};

const getMitosisRect = (rect: Rect, position: PawnSquarePositionEnum) => {
	const topLeftPostions = {
		[PawnSquarePositionEnum.TOP_LEFT]: [-rect.size / 3, -rect.size / 3],
		[PawnSquarePositionEnum.TOP_RIGHT]: [-rect.size / 3, rect.size / 3],
		[PawnSquarePositionEnum.BOTTOM_LEFT]: [rect.size / 3, -rect.size / 3],
		[PawnSquarePositionEnum.BOTTOM_RIGHT]: [rect.size / 3, rect.size / 3],
	};

	const [top, left] = topLeftPostions[position];

	return {
		top: rect.top + Math.floor(top),
		left: rect.left + Math.floor(left),
		size: Math.floor(rect.size * 0.8),
	};
};

const addKaryogamy = async (karyogamy: KaryogamyMutation[], animate = false) => {
	const squarePawns = karyogamy.filter((m) => m.type === AnimationTypeEnum.ADDED);
	if (!animate)
		squarePawns.push(...karyogamy.filter((m) => m.type === AnimationTypeEnum.ANIMATED));

	if (!squarePawns.length) return;

	const animationPromises = [];

	for (const color of colors) {
		const pawns = squarePawns.filter((m) => m.color === color);
		if (pawns.length < 2) continue;

		const els = pawns
			.map(({id}) => document.getElementById(pawnId(color, id)))
			.filter((el): el is HTMLElement => !!el);

		if (animate) {
			els.forEach((el) => (el.style.transition = 'all 100ms ease-in'));
			await sleep(10);
		} else {
			els.forEach((el) => (el.style.transition = 'unset'));
		}

		for (const el of els) {
			const transformProperties = el.style.transform
				.split(' ')
				.filter((p) => !p.includes('scale'));
			transformProperties.push(`scale(1.${pawns.length * 2})`);
			el.style.transform = transformProperties.join(' ');
		}

		animationPromises.push(
			sleep(100).then(() => {
				els.forEach((el) => {
					const pawn = pawns.find(({id}) => pawnId(color, id) === el.id);
					el.style.display = pawn?.isMain ? 'block' : 'none';
				});
			}),
		);
	}

	await Promise.all(animationPromises);
};

const removeKaryogamy = async (karyogamy: KaryogamyMutation[], animate = false) => {
	const mapKaryogamyEl = new Map<ColorEnum, [KaryogamyMutation, HTMLElement][]>();
	karyogamy
		.filter((m) => m.type === AnimationTypeEnum.ANIMATED)
		.forEach((pawn) =>
			mapKaryogamyEl.set(pawn.color, [
				...(mapKaryogamyEl.get(pawn.color) ?? []),
				[pawn, document.getElementById(pawnId(pawn.color, pawn.id))!],
			]),
		);
	if (!mapKaryogamyEl.size) return;

	const [sleepTime, styleTransition] = animate ? [100, 'all 100ms ease-in'] : [0, 'unset'];
	mapKaryogamyEl.forEach((tuple) =>
		tuple.forEach(([, el]) => (el.style.transition = styleTransition)),
	);

	if (animate) await sleep(10);

	for (const [, mutations] of mapKaryogamyEl) {
		const count = mutations.length;
		for (const [pawn, el] of mutations) {
			const transformProperties = el.style.transform
				.split(' ')
				.filter((p) => !p.includes('scale'));
			transformProperties.push(`scale(1.${count === 1 ? 0 : count * 2})`);
			el.style.transform = transformProperties.join(' ');
			el.style.display = pawn.isMain ? 'block' : 'none';
		}
	}
};

const addMitosis = async (mitosis: MitosisIdentifier[], squareId: SquareId, animate = false) => {
	const newSquarePawns = mitosis.filter((m) => m.type === AnimationTypeEnum.ADDED);
	if (!animate)
		newSquarePawns.push(...mitosis.filter((m) => m.type === AnimationTypeEnum.ANIMATED));

	if (!newSquarePawns.length) return;
	if (newSquarePawns.every((m) => m.color === newSquarePawns[0].color)) return;

	const rect = getRect(squareId);
	for (const color of colors) {
		const mitosisPawns = newSquarePawns.filter((m) => m.color === color);
		if (!mitosisPawns.length) continue;

		const els = mitosisPawns
			.map(({index}) => document.getElementById(pawnId(color, index)))
			.filter((el): el is HTMLElement => !!el);

		if (animate) {
			els.forEach((el) => (el.style.transition = 'all 100ms ease-in'));
			await sleep(10);
		} else {
			els.forEach((el) => (el.style.transition = 'unset'));
		}

		const mitosisRect = getMitosisRect(rect, mitosisPawns[0].position);

		els.forEach((el) => setScreenPosition(el, mitosisRect));
	}

	if (animate) await sleep(90);
};

const removeMitosis = async (mitosis: MitosisIdentifier[], squareId: SquareId, animate = false) => {
	const pawnsOnSquare = mitosis.filter((m) => m.type === AnimationTypeEnum.ANIMATED);
	if (!pawnsOnSquare.length) return;
	if (pawnsOnSquare.some((m) => m.color !== pawnsOnSquare[0].color)) return;

	const rect = getRect(squareId);

	const els = pawnsOnSquare
		.map(({color, index}) => document.getElementById(pawnId(color, index)))
		.filter((el): el is HTMLElement => !!el);

	if (animate) {
		els.forEach((el) => (el.style.transition = 'all 100ms ease-in'));
		await sleep(10);
	} else {
		els.forEach((el) => (el.style.transition = 'unset'));
	}

	els.forEach((el) => setScreenPosition(el, rect));

	if (animate) await sleep(90);
};

export const BoardPawns = () => {
	const {game, gameEvents, playerId} = useContext(GameContext);
	if (!game) return null;

	const smashPawn = async ({color, index}: PawnIdentifier, z: string) => {
		const el = document.getElementById(pawnId(color, index));
		if (!el) return;
		const rect = getRect(`initial-${color}-${index}`);
		if (!rect) return;

		el.style.transition = 'transform 100ms ease-in';
		await sleep(100);
		el.style.transform = `scaleY(0) scaleX(1.5) rotateX(30deg) translateZ(${z})`;
		await sleep(100);
		el.style.transition = 'unset';
		await sleep(10);
		setScreenPosition(el, rect);
		await sleep(10);
		el.style.transition = 'transform 100ms ease-in';
		await sleep(10);
		el.style.transform = `scaleY(1) scaleX(1) rotateX(0) translateZ(0)`;
	};

	const animatePawns = async () => {
		const pawnsPositions: {
			pawnEl: HTMLElement;
			rect: Rect;
			initialMove: boolean;
			toSmash?: boolean;
			toRemoveMitosis?: boolean;
			toRemoveKaryogamy?: boolean;
		}[] = [];
		const {color, index, squaresIds, startingSquareId, smash} = game.board.movePawn!;
		const pawn = game.board.pawns[color]?.find((p) => p.index === index);
		if (!pawn) return;

		const pawnEl = document.getElementById(pawnId(color, index));
		if (!pawnEl) return;

		for (const squareId of squaresIds) {
			const rect = getRect(squareId);
			const initialRoad = game.board.road.find((r) => r.color === pawn.color && r.entrance);
			pawnsPositions.push({
				pawnEl,
				rect,
				initialMove: squareId === initialRoad?.id,
			});
		}

		if (pawnsPositions[1]) pawnsPositions[1].toRemoveMitosis = true;
		if (smash) pawnsPositions.at(-1)!.toSmash = true;
		pawnsPositions[0].toRemoveKaryogamy = true;

		for (const {
			pawnEl,
			rect,
			initialMove,
			toSmash,
			toRemoveMitosis,
			toRemoveKaryogamy,
		} of pawnsPositions) {
			const zSize = `${rect.size / 2}px`;
			if (initialMove) {
				pawnEl.style.transition = 'transform 150ms ease-in';
				await sleep(10);
				pawnEl.style.transform = `skewY(90deg) scale(0.75) rotateX(30deg) translateZ(${zSize})`;
				await sleep(150);
				await sleep(10);
				pawnEl.style.transition = 'unset';
				await sleep(10);
				setScreenPosition(pawnEl, rect);
				await sleep(10);
				pawnEl.style.transition = 'transform 150ms ease-in';
				await sleep(10);
				pawnEl.style.transform = `skewY(0deg) scale(1) rotateX(30deg) translateZ(${zSize})`;
				await sleep(150);
			} else {
				if (toRemoveKaryogamy) {
					const karyogamy = game.board.karyogamy[startingSquareId];
					if (karyogamy) removeKaryogamy(karyogamy, true);
				}
				if (toRemoveMitosis) {
					const mitosis = game.board.mitosis[startingSquareId];
					if (mitosis) removeMitosis(mitosis, startingSquareId, true);
				}
				pawnEl.style.transformOrigin = 'bottom center';
				pawnEl.style.transition = 'transform 100ms ease-in';
				await sleep(10);
				pawnEl.style.transform = `scaleY(0.75) scaleX(1.1) rotateX(30deg) translateZ(${zSize})`;
				await sleep(100);
				pawnEl.style.transform = `scaleY(1.2) scaleX(0.8) rotateX(30deg) translateZ(${zSize})`;
				await sleep(80);
				pawnEl.style.transition = 'all 250ms cubic-bezier(0.01,-0.59, 0.97, 1.33)';
				await sleep(10);
				setScreenPosition(pawnEl, rect);
				toSmash && smashPawn(smash!, zSize);
				await sleep(250);
				pawnEl.style.transition = 'transform 100ms ease-out';
				await sleep(10);
				pawnEl.style.transform = `scaleY(0.75) scaleX(1.1) rotateX(30deg) translateZ(${zSize})`;
				await sleep(10);
				pawnEl.style.transform = `scaleY(1) scaleX(1) rotateX(30deg) translateZ(${zSize})`;
				await sleep(100);
			}
		}

		const mitosis = game.board.mitosis[pawn.squareId];
		if (mitosis?.length) await addMitosis(mitosis, pawn.squareId, true);

		const karyogamy = game.board.karyogamy[pawn.squareId];
		if (karyogamy?.length) await addKaryogamy(karyogamy, true);

		gameEvents.pawnMoved();
	};

	const sendPawnsToPosition = () => {
		const squaresIds: SquareId[] = [];
		for (const color of colors) {
			for (const pawn of game.board.pawns[color]) {
				const squareId = pawn.squareId;
				const rect = getRect(squareId);
				const pawnDiv = document.getElementById(pawnId(color, pawn.index));
				if (!pawnDiv) continue;
				setScreenPosition(pawnDiv, rect);
				if (pawn.endReached) {
					pawnDiv.style.transform = `rotateX(30deg) translateZ(${rect.size / 2}px)`;
				}
				squaresIds.push(squareId);
			}
		}

		for (const squareId of squaresIds) {
			const mitosis = game.board.mitosis[squareId];
			if (mitosis?.length) {
				removeMitosis(mitosis, squareId, false);
				addMitosis(mitosis, squareId, false);
			}

			const karyogamy = game.board.karyogamy[squareId];
			if (karyogamy?.length) {
				removeKaryogamy(karyogamy, false);
				addKaryogamy(karyogamy, true);
			}
		}
	};

	useEffect(() => {
		if (game?.board.pawns) {
			setTimeout(() => {
				sendPawnsToPosition();
			});
		}
	}, []);

	useEffect(() => {
		if (game.board.movePawn) {
			setTimeout(() => {
				animatePawns();
			});
		} else {
			setTimeout(() => {
				sendPawnsToPosition();
			});
		}
	}, [game]);

	useResizeObserver(() => {
		if (game?.board.pawns) {
			setTimeout(() => {
				sendPawnsToPosition();
			});
		}
	});

	return (
		<>
			{colors.flatMap((color) =>
				game.board.pawns[color].map(({color, index, action}) => {
					const hasActions = action && playerId === game.current;
					return createPortal(
						<Pawn
							className='pawn'
							id={pawnId(color, index)}
							action={hasActions ? () => gameEvents.event(action) : undefined}
							gameEventHighlight={hasActions}
							color={color}
							key={color + index}
						/>,
						document.getElementById('root')!,
					);
				}),
			)}
		</>
	);
};

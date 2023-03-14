import {ColorEnum} from '../../../../services/Game/interfaces/colors';

export const InitialArea = ({color}: {color: ColorEnum}) => (
	<article className={`initial-area player-${color}`}>
		<section className='player-circle'>
			{[...Array(4)].map((_, i) => (
				<article
					key={`${color}-${i}`}
					id={`initial-${color}-${i}`}
					data-shadow
					className='pawn-initial-circle'
				></article>
			))}
		</section>
	</article>
);

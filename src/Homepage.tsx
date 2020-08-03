/** @format */

import React, { Fragment } from 'react';
import { IEpisodeProps } from './interfaces';
import { Store } from './Store';
import { fetchDataAction, toggleFavAction } from './Actions';

const Homepage = () => {
	const { state, dispatch } = React.useContext(Store);

	React.useEffect(() => {
		state.episodes.length === 0 && fetchDataAction(dispatch);
	});

	const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

	const props: IEpisodeProps = {
		episodes: state.episodes,
		store: { state, dispatch },
		toggleFavAction,
		favorites: state.favorites,
	};

	return (
		<React.Fragment>
			<React.Suspense fallback={<div>Loading</div>}>
				<section className='episode-layout'>
					<EpisodeList {...props} />
				</section>
			</React.Suspense>
		</React.Fragment>
	);
};

export default Homepage;

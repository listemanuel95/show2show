import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { React, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowIcon from '@mui/icons-material/SyncAlt';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ShowHeader from './ShowHeader';
import LinkingBreadcrumb from './LinkingBreadcrumb';
import Cast from './Cast';
import Shows from './Shows';


function App() {

  const [show1, setShow1] = useState(null);
  const [show2, setShow2] = useState(null);
	const [currentSelections, setCurrentSelections] = useState([]);
  const [selectingFromCast, setSelectingFromCast] = useState(true);
	const [currentCastMemberShows, setCurrentCastMemberShows] = useState([]);
	const [currentCastMembers, setCurrentCastMembers] = useState([]);
	const [youWinModalOpen, setYouWinModalOpen] = useState(false);

	const bearerToken = process.env.REACT_APP_TMDB_BEARER_TOKEN;
	const imageUrl = 'https://image.tmdb.org/t/p/original/';
	const requestOptions = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer ' + bearerToken,
		}
	};
	
	// uncomment to obtain more show IDs
	// const lastPage = 10;
	// useEffect(() => {
	// 	fetch(`https://api.themoviedb.org/3/discover/tv?first_air_date.gte=1980-01-01&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${lastPage}&sort_by=popularity.desc&vote_count.gte=100&with_original_language=en`, requestOptions)
	// 		.then(res => res.json())
	// 		.then(shows => {
	// 			console.log(shows.results.map((show) => show.id));
	// 		})
	// 		.catch(err => console.error(err));
	// }, []);

	// I compiled this list by repeatedly uncommenting the above method and changing the lastPage constant. I don't do this with an automated process since it would require a lot of API calls (every call yields 20 results max)
	const validShowIDs = [59941,63770,31132,33217,2224,1400,4629,32415,13943,5920,84910,4239,1434,1416,3626,67136,48891,456,2734,57532,18347,60625,94954,1871,46648,562,4604,63174,4551,73586,37680,44006,49009,549,1620,62223,66599,57243,68073,62517,60622,17610,4614,45140,1622,49011,4656,137893,1516,60797,46952,21510,37678,2426,128839,62313,87917,15260,60694,764,107124,1413,56590,10160,85349,34307,40075,1431,59717,117030,1396,108978,4057,1911,4546,1408,48866,1399,201834,79061,8514,44217,4385,3452,32294,60735,61871,32798,58841,62710,2384,90282,1415,1419,62560,4419,1668,1433,4087,74016,12225,103540,79744,2119,2190,114478,102321,1421,1695,14658,32692,63329,71728,74440,10938,2359,60574,39340,314,2316,12786,84200,1220,91363,38657,60839,62650,64513,4386,1402,60059,56570,498,65494,105971,1398,1395,72027,2691,4500,1981,1412,38693,2458,34524,62688,85552,39351,17287,141,2685,4601,75450,43901,2352,84958,39269,71712,2617,1973,32726,39297,63247,2593,1558,67133,62286,2098,127635,62858,66732,72581,59427,693,86831,18165,44857,50035,1554,1417,607,2875,1409,202411,162,69478,4238,122226,90,4589,3022,31109,655,4454,2985,4586,95,71790,72350,4229];

  const theme = createTheme({
		palette: {
			primary: {
				main: '#BD93F9',
			},
			secondary: {
				main: '#FF79C6',
			},
			common: {
				white: '#6272A4',
			},
			background: {
				paper: '#44475A',
			},
		},
		components: {
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						color: '#FF79C6',
						backgroundColor: '#44475A',
					},
				},
			},
		},
  });

	function changeCurrentShow(show) {
		fetch(`https://api.themoviedb.org/3/tv/${show.id}/aggregate_credits?language=en-US`, requestOptions)
			.then(res => res.json())
			.then(credits => {
				setCurrentCastMembers(credits.cast);
			})
			.catch(err => console.error(err));
	}

	useEffect(() => {
		const idShow1 = validShowIDs[Math.floor(Math.random() * validShowIDs.length)];
		const idShow2 = validShowIDs[Math.floor(Math.random() * validShowIDs.length)];

		// get first show
		fetch(`https://api.themoviedb.org/3/tv/${idShow1}?language=en-US`, requestOptions)
			.then(res => res.json())
			.then(show => {
				changeCurrentShow(show);
				setShow1(show);
			})
			.catch(err => console.error(err));

		// get second show
		fetch(`https://api.themoviedb.org/3/tv/${idShow2}?language=en-US`, requestOptions)
			.then(res => res.json())
			.then(show => {
				setShow2(show);
			})
			.catch(err => console.error(err));

	}, []);

	const onCastClick = (event) => {
		// get person
		const personId = event.currentTarget.id;
		
		fetch(`https://api.themoviedb.org/3/person/${personId}?append_to_response=tv_credits&language=en-US`, requestOptions)
			.then(res => res.json())
			.then(person => {
				const obj = { linkType: 'person', data: { id: person.id, name: person.name, image: person.profile_path} };
				const copy = [...currentSelections];
				copy.push(obj);
				setCurrentSelections(copy);
				setSelectingFromCast(false);
				setCurrentCastMemberShows(person.tv_credits.cast);
			})
			.catch(err => console.error(err));
	}

	const onShowClick = (event) => {
		// get show
		const showId = event.currentTarget.id;

		if(parseInt(showId) === parseInt(show2.id)) {
			setYouWinModalOpen(true);
		} else {
			fetch(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`, requestOptions)
				.then(res => res.json())
				.then(show => {
					const obj = { linkType: 'show', data: { id: show.id, name: show.name, image: show.poster_path} };
					changeCurrentShow(show);
					const copy = [...currentSelections];
					copy.push(obj);
					setCurrentSelections(copy);
					setSelectingFromCast(true);
				})
				.catch(err => console.error(err));
		}
	}

	const onWinModalClose = () => {
		setYouWinModalOpen(false);
	}

	const replayButtonClick = () => {
		window.location.reload(true);
	}

	const swapStartingShow = () => {
		setCurrentSelections([]);
		setSelectingFromCast(true);

		const aux = show1;
		changeCurrentShow(show2);
		setShow1(show2);
		setShow2(aux);
	}

  return (
    <div className="App">
			<Helmet>
				<title>show2show</title>
				<meta name="viewport" content="initial-scale=1, width=device-width"/>
			</Helmet>
			<ThemeProvider theme={theme}>
				<Modal open={youWinModalOpen} onClose={onWinModalClose}>
					<Box className="you-win-modal">
						<Typography variant="h4" component="div" sx={{ flexGrow: 1, align: 'center'}}>
							You won!
						</Typography>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1, align: 'center'}}>
							It took you {currentSelections.length} links to get there, see if you can do better!
						</Typography>
						<Button onClick={replayButtonClick} sx={{ color: '#000', backgroundColor: '8BE9FD', margin: '0.5rem', padding: '0.5rem' }}>Play another game</Button>
					</Box>
				</Modal>
				<AppBar position="static" sx={{ padding: '1rem' }}>
					<Typography variant="h3" component="div" sx={{ flexGrow: 1}}>
						show2show
					</Typography>
				</AppBar>
				<div className="header-shows">
					<div>
						{show1 ? <ShowHeader name={show1.name} imageSrc={imageUrl + show1.poster_path}/> : 'Loading show...'}
					</div>
					<div>
						<Tooltip title="Click to swap starting show">
							<IconButton sx={{ padding: '1.25rem' }} color="secondary" onClick={swapStartingShow}>
								<ArrowIcon />
							</IconButton>
						</Tooltip>
					</div>
					<div>
						{show2 ? <ShowHeader name={show2.name} imageSrc={imageUrl + show2.poster_path}/> : 'Loading show...'}
					</div>
				</div>
				<Divider className="divider" orientation="horizontal" flexItem />
				<LinkingBreadcrumb data={currentSelections}/>
				<Divider className="divider" orientation="horizontal" flexItem />
				<div className="main-content">
					{ selectingFromCast ? 
							<Cast onMemberClicked={onCastClick} castMembers={currentCastMembers}/> 
						: <Shows onShowClicked={onShowClick} shows={currentCastMemberShows}/>
					}
				</div>
				<AppBar position="fixed" sx={{ padding: '1rem', top: 'auto', bottom: 0 }}>
					<div className="links">
						show2show is <a href="#" target="_blank" rel="noreferrer">open source</a>, made using <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TMDB</a> & inspired by <a href="https://movietomovie.com" target="_blank" rel="noreferrer">MovietoMovie</a>
					</div>
				</AppBar>
			</ThemeProvider>
    </div>
  );
}

export default App;

import EliminationIcon from 'src/components/icons/elimination/EliminationIcon';
import LastManStandingIcon from 'src/components/icons/LastManStanding/LastManStanding';
import RoundRobinIcon from 'src/components/icons/roundRobin/RoundRobinIcon';
import cardIconStyle from 'src/styles/CardIconStyle';
import { TournamentType } from 'src/types/main.types';

const GAME_CARDS = [
  {
    tournamentType: TournamentType.elimination,
    color: '#ac47ac',
    name: 'Elimination',
    icon: <EliminationIcon style={cardIconStyle} />,
  },
  {
    tournamentType: TournamentType.lastManStanding,
    color: '#ef6c00',
    name: 'Last Man standing',
    icon: <LastManStandingIcon style={cardIconStyle} />,
  },
  {
    tournamentType: TournamentType.roundRobin,
    color: '#4f9e18',
    name: 'Round Robin',
    icon: <RoundRobinIcon style={cardIconStyle} />,
  },
];

export default GAME_CARDS;

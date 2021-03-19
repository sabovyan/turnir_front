import EliminationIcon from 'src/components/icons/elimination/EliminationIcon';
import LastManStandingIcon from 'src/components/icons/LastManStanding/LastManStanding';
import RoundRobinIcon from 'src/components/icons/roundRobin/RoundRobinIcon';
import GroupCardIconStyle from 'src/styles/GroupCardIconStyle';
import colors from 'src/styles/colors';
import { TournamentType } from 'src/types/main.types';

type GameCard = {
  tournamentType: TournamentType;
  color: string;
  name: string;
  icon: JSX.Element;
};

const GAME_CARDS: GameCard[] = [
  {
    tournamentType: TournamentType.elimination,
    color: colors.elimination,
    name: 'Elimination',
    icon: <EliminationIcon style={GroupCardIconStyle} />,
  },
  {
    tournamentType: TournamentType.lastManStanding,
    color: colors.lastManStanding,
    name: 'Last Man standing',
    icon: <LastManStandingIcon style={GroupCardIconStyle} />,
  },
  {
    tournamentType: TournamentType.roundRobin,
    color: colors.roundRobin,
    name: 'Round Robin',
    icon: <RoundRobinIcon style={GroupCardIconStyle} />,
  },
];

export default GAME_CARDS;

import DrawYourPartnerIcon from 'src/components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import SingleIcon from 'src/components/icons/Single/SingleIcon';
import TeamsIcon from 'src/components/icons/Teams/TeamsIcon';
import { PlayersType } from 'src/types/main.types';
import Color from 'src/styles/colors';
import personCardIconStyle from 'src/styles/personCardIconStyle';
import Monster from 'src/components/icons/monster/Monster';

type ParticipantCard = {
  color: Color;
  name: string;
  icon: JSX.Element;
  type: PlayersType;
};

const PARTICIPANT_CARDS: ParticipantCard[] = [
  {
    color: Color.single,
    name: 'Single',
    icon: <SingleIcon style={personCardIconStyle} />,
    type: PlayersType.single,
  },
  {
    color: Color.teams,
    name: 'Teams',
    icon: <TeamsIcon style={personCardIconStyle} />,
    type: PlayersType.team,
  },
  {
    color: Color.DrawYourPartner,
    name: 'Draw Your Partner',
    icon: <DrawYourPartnerIcon style={personCardIconStyle} />,
    type: PlayersType.DYP,
  },
  {
    color: Color.monster,
    name: 'Monster DYP',
    icon: <Monster style={personCardIconStyle} />,
    type: PlayersType.MDYP,
  },
];

export default PARTICIPANT_CARDS;

import DrawYourPartnerIcon from 'src/components/icons/DrawYourPartnerIcon/DrawYourPartnerIcon';
import SingleIcon from 'src/components/icons/Single/SingleIcon';
import TeamsIcon from 'src/components/icons/Teams/TeamsIcon';
import Color from 'src/styles/colors';
import personCardIconStyle from 'src/styles/personCardIconStyle';
import { PlayersSettingsView } from 'src/types/main.types';
import { string } from 'yup/lib/locale';

type ParticipantCard = {
  color: Color;
  name: string;
  icon: JSX.Element;
  playersSettingsView: PlayersSettingsView;
};

const PARTICIPANT_CARDS: ParticipantCard[] = [
  {
    color: Color.single,
    name: 'Single',
    icon: <SingleIcon style={personCardIconStyle} />,
    playersSettingsView: PlayersSettingsView.single,
  },
  {
    color: Color.teams,
    name: 'Teams',
    icon: <TeamsIcon style={personCardIconStyle} />,
    playersSettingsView: PlayersSettingsView.team,
  },
  {
    color: Color.DrawYourPartner,
    name: 'Draw Your Partner',
    icon: <DrawYourPartnerIcon style={personCardIconStyle} />,
    playersSettingsView: PlayersSettingsView.DRP,
  },
];

export default PARTICIPANT_CARDS;

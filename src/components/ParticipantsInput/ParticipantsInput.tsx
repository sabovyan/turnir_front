import React from 'react';

import ParticipantsInputList from '../ParticipantsInputList/ParticipantsInputList';
import Typography from '@material-ui/core/Typography/Typography';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import SingleIcon from '../icons/Single/SingleIcon';
import Card from '@material-ui/core/Card';

import { useTranslation } from 'react-i18next';

import styles from './ParticipantsInput.module.css';
import colors from '../../styles/colors';

interface IParticipantsInputProps {
  icon: JSX.Element;
  name: string;
}

const ParticipantInput = ({ icon, name }: IParticipantsInputProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Card raised style={{ minWidth: 500 }}>
        <div
          className={styles.hero}
          style={{
            background: colors.single,
          }}
        >
          <CloseButton style={{ alignSelf: 'flex-end', color: 'white' }} />
          <div className={styles.heroIdentity}>
            {icon}

            <Typography variant="h5" style={{ color: 'white', padding: 10 }}>
              {t(name)}
            </Typography>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <Typography color="textSecondary" style={{ alignSelf: 'flex-start' }}>
            {t('Names')}
          </Typography>
          <ParticipantsInputList />
        </div>
      </Card>
    </div>
  );
};

export default ParticipantInput;

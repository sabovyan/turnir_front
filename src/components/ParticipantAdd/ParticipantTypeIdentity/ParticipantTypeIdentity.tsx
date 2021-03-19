import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseButton from '../../common/Buttons/CloseButton/CloseButton';

import styles from './ParticipantTypeIdentity.module.css';

interface Props {
  bgColor: string;
  name: string;
  onCloseButtonClick: () => void;
  icon: JSX.Element | null;
}

const ParticipantTypeIdentity = ({
  bgColor,
  name,
  onCloseButtonClick,
  icon,
}: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={styles.container}
      style={{
        background: bgColor,
      }}
    >
      <CloseButton
        style={{ alignSelf: 'flex-end', color: 'white' }}
        onClick={onCloseButtonClick}
      />
      <div className={styles.iconWrapper}>
        {icon}

        <Typography variant="h5" style={{ color: 'white', padding: 10 }}>
          {t(name)}
        </Typography>
      </div>
    </div>
  );
};

export default ParticipantTypeIdentity;

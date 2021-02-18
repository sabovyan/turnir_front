import React, { ChangeEvent, FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import FormField from '../../Input/FormField';

import { useTranslation } from 'react-i18next';

interface IParticipantsInputFormProps {
  handleNameInputSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleNameInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  currentPlayerName: string;
}

const ParticipantsInputForm = ({
  handleNameInputSubmit,
  handleNameInputChange,
  currentPlayerName,
}: IParticipantsInputFormProps) => {
  const { t } = useTranslation();

  return (
    <div style={{ margin: '1rem', padding: '1rem' }}>
      <Typography
        color="textSecondary"
        style={{ alignSelf: 'flex-start', margin: '10px 0' }}
      >
        {t('Enter names of the players')}
      </Typography>
      <form onSubmit={handleNameInputSubmit}>
        <FormField
          label=""
          onChange={handleNameInputChange}
          value={currentPlayerName}
          style={{ width: '300px' }}
        />
      </form>
    </div>
  );
};

export default ParticipantsInputForm;

import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LastManStandingDescription } from 'src/constants/description';
import { livesArray } from 'src/constants/quantity';
import { RootState } from 'src/store/features';
import { setTablesQuantity } from 'src/store/features/settingsInfo';
import SettingsListItem from '../../SettingsListItem/SettingsListItem';
import SettingsSelect from '../../SettingsSelect/SettingsSelect';

interface Props {}

const Lives = (props: Props) => {
  const { lives } = useSelector((state: RootState) => state.settingsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleTablesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const tables = Number(value);

    dispatch(setTablesQuantity({ tables }));
  };
  return (
    <SettingsListItem
      header={t('Last Man Standing')}
      description={t(LastManStandingDescription)}
    >
      <SettingsSelect
        label={t('Number of Lives')}
        array={livesArray}
        type={'Lives'}
        firstItemType={'Life'}
        value={String(lives)}
        onChange={handleTablesChange}
      />
    </SettingsListItem>
  );
};

export default Lives;

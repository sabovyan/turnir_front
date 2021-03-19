import React, { ChangeEvent, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import CButton from '../../common/Buttons/CustomButton/CustomButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SortIcon from '@material-ui/icons/Sort';
import FormField from '../../Input/FormField';
import CloseIcon from '@material-ui/icons/Close';

import { useTranslation } from 'react-i18next';

import styles from './HomeTopBar.module.css';
import { mode } from '../../../types/main.types';

const tournamentModes: mode[] = [
  'All modes',
  'Round Robin',
  'Last Man standing',
  'Elimination',
];

const useStyles = makeStyles({
  topBar: {
    margin: 0,
    padding: '0 1rem 0 1rem',
    justifyContent: 'space-between',
  },

  toolbar: {
    margin: 0,

    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
});

const HomeTopBar = () => {
  const classes = useStyles();
  const [selectedMode, setSelectedMode] = useState<mode>('All modes');
  const [isSearchInputWide, setIsSearchInputWide] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState('name');

  const { t } = useTranslation();

  const handleModeSelect = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setSelectedMode(event.target.value as mode);
  };

  const handleSearchIconClick = () => {
    setIsSearchInputWide((state) => !state);
  };

  const handleNameFilterClick = () => {
    setActiveFilter('name');
  };

  const handleDateFilterClick = () => {
    setActiveFilter('date');
  };

  return (
    <AppBar position="static" color="transparent" className={classes.topBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" noWrap color="textSecondary">
          {t('Manage Tournaments')}
        </Typography>
        <CButton text={t('NEW TOURNAMENT')} />
      </Toolbar>

      <Toolbar className={classes.toolbar}>
        <div className={styles.topBarBottom__left}>
          <div className={styles.topBar__sort}>
            <SortIcon />
            <Typography
              color={activeFilter === 'name' ? 'textPrimary' : 'textSecondary'}
              variant="body1"
              component="span"
              onClick={handleNameFilterClick}
              style={{ cursor: 'pointer' }}
            >
              {t('By Name')}
            </Typography>

            <div className={styles.topBar__divider} />
            <Typography
              color={activeFilter === 'date' ? 'textPrimary' : 'textSecondary'}
              variant="body1"
              component="span"
              onClick={handleDateFilterClick}
              style={{ cursor: 'pointer' }}
            >
              {t('By Date')}
            </Typography>
          </div>
          <div className={styles.topBar__filter}>
            <FilterListIcon style={{ margin: '0 1rem' }} />
            <TextField select value={selectedMode} onChange={handleModeSelect}>
              {tournamentModes.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {t(mode)}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
        <div
          className={styles.TopBarBottom__right}
          style={{
            width: isSearchInputWide ? 300 : 50,
          }}
        >
          <IconButton
            onClick={handleSearchIconClick}
            aria-label="search"
            style={{ margin: '0' }}
          >
            <SearchIcon />
          </IconButton>
          <div className={styles.searchInput}>
            <FormField label="" />
            <IconButton
              onClick={handleSearchIconClick}
              aria-label="close search text field"
              style={{ margin: '0' }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default HomeTopBar;

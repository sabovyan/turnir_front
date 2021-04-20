import { makeStyles } from '@material-ui/core';

const useCardStyles = makeStyles({
  card: {
    width: 250,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 2px #acacac',
    transition: 'box-shadow 100ms linear',

    '&:hover': {
      boxShadow: '0 0 6px #acacac',
    },
  },

  cardContent: {
    color: 'white',
    flexGrow: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },

  action: {
    flexGrow: 0,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default useCardStyles;

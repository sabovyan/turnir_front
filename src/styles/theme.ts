import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const greenTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[800],
    },
  },
  spacing: [2, 2, 2, 16],
});

export default greenTheme;

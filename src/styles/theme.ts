import { createMuiTheme } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const greenTheme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: red[400],
    },
  },
  spacing: [2, 2, 2, 16],
});

export default greenTheme;

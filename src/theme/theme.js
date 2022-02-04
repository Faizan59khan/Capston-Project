import { createTheme  } from '@material-ui/core/styles';

import palette from './palette';
import typography from './typography';
import MuiButton from './overrides/MuiButton';
import MuiIconButton from './overrides/MuiIconButton';
import MuiPaper from './overrides/MuiPaper';
import MuiTableCell from './overrides/MuiTableCell';
import MuiTableHead from './overrides/MuiTableHead';
import MuiTableRow from './overrides/MuiTableRow';
import MuiTypography from './overrides/MuiTypography';


const theme = createTheme({
  palette,
  MuiButton,
  MuiIconButton,
  MuiPaper,
  MuiTableCell,
  MuiTableHead,
  MuiTableRow,
  MuiTypography,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;

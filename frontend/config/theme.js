import { createTheme } from '@mui/material/styles';
import { Lato } from 'next/font/google'

const lato = Lato({ 
    weight: ['300', '400', '700'],
    subsets: ['latin'] 
})

// Create a theme instance.
const theme = createTheme({
palette: {
    background: {
        default: "#F8F8F8",
    },
   primary: {
      main: '#6C63FF',
      light: '#F8F4FF',
   },
   secondary: {
     main: '#ACB1BD',
     light: '#F1F3F6',
     dark:'#777777',
   },
  },
typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default theme;
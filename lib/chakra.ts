import { extendTheme, theme as defaultTheme } from '@chakra-ui/react';

export const theme = extendTheme(defaultTheme, {
  styles: {
    global: {
      //   '.md pre > code:first-child:last-child': {
      //     width: '100%',
      //     padding: 4,
      //   },
    },
  },
});

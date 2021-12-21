import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      '.md': {
        'pre[data-lang] > pre[data-lang]': {
          padding: '0 !important'
        }
      }
    }
  },
  layerStyles: {
    topBarSpacer: {
      width: 100,
    },
    noFocusOutline: {
      '--chakra-shadows-outline': 'none',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

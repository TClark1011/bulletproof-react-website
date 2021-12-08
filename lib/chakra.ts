import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  layerStyles: {
    topBarSpacer: {
      width: 100,
    },
    noFocusOutline: {
      '--chakra-shadows-outline': 'none',
    },
  },
  config: {
    useSystemColorMode: true,
  },
});

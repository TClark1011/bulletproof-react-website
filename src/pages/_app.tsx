import { ChakraProvider, GlobalStyle } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { theme } from '../lib/chakra';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

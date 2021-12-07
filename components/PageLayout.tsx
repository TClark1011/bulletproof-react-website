import { Box, Center } from '@chakra-ui/layout';
import { FC } from 'react';

const PageLayout: FC = ({ children }) => {
  return (
    <Center>
      <Box maxWidth={600}>{children}</Box>
    </Center>
  );
};

export default PageLayout;

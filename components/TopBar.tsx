import { useColorModeValue } from '@chakra-ui/color-mode';
import { BoxProps, Center, Flex } from '@chakra-ui/layout';
import { FC } from 'react';

const TopBar: FC<BoxProps> = ({ children, ...props }) => {
  const backgroundColor = useColorModeValue('gray.50', 'gray.900');
  return (
    <Flex
      width="100%"
      background={backgroundColor}
      {...props}
      padding={4}
      justify="space-between"
      align="center"
    >
      {children}
    </Flex>
  );
};

export default TopBar;

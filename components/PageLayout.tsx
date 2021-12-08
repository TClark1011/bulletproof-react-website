import { Button, IconButton } from '@chakra-ui/button';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, HStack, Link } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import { HomeIcon, LogoGithubIcon } from 'chakra-ui-ionicons';
import { startCase } from 'lodash';
import { FC } from 'react';
import TopBar from './TopBar';
import { REPO_LINK } from '../config/env';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import usePageTitle from '../hooks/usePageTitle';
import { useBreakpoint } from '@chakra-ui/media-query';
import useClientIsMobile from '../hooks/useClientIsMobile';
import usePageProps from '../hooks/usePageProps';

const contentBodyWidth = 600;

const NavBarIconButton: typeof IconButton = (props) => (
  <IconButton rounded="full" variant="ghost" {...props} />
);

const PageLayout: FC = ({ children }) => {
  const { subPages, originalRepositoryUrl } = usePageProps();
  const ColorModeIcon = useColorModeValue(SunIcon, MoonIcon);
  const { toggleColorMode } = useColorMode();
  const currentPageTitle = usePageTitle();
  const clientIsMobile = useClientIsMobile();

  return (
    <Flex direction="column">
      <TopBar>
        {!clientIsMobile && <Box layerStyle="topBarSpacer" />}
        <Flex
          flexGrow={1}
          maxWidth={contentBodyWidth}
          justify="space-between"
          align="center"
        >
          {!clientIsMobile && (
            <Button
              as={Link}
              variant="ghost"
              href={'/'}
              leftIcon={<HomeIcon />}
            >
              Home
            </Button>
          )}
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              rightIcon={<ChevronDownIcon />}
            >
              {currentPageTitle}
            </MenuButton>
            <MenuList shadow="xl">
              <MenuItem
                as={Link}
                href="/"
                layerStyle="noFocusOutline"
                disabled={currentPageTitle === 'Home'}
              >
                Home
              </MenuItem>
              <MenuDivider />
              {subPages.map((page) => (
                <MenuItem
                  key={page}
                  as={Link}
                  layerStyle="noFocusOutline"
                  href={`/${page}`}
                  disabled={currentPageTitle === startCase(page)}
                >
                  {startCase(page)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
        <HStack layerStyle="topBarSpacer">
          <NavBarIconButton
            icon={<ColorModeIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
          />
          <NavBarIconButton
            icon={<LogoGithubIcon />}
            href={originalRepositoryUrl}
            aria-label="GitHub repository"
            as={Link}
          />
        </HStack>
      </TopBar>
      <Center flexGrow={1} boxSize="100%" paddingX={4}>
        <Box maxWidth={contentBodyWidth}>{children}</Box>
      </Center>
    </Flex>
  );
};

export default PageLayout;

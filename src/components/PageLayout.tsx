import { Button, IconButton } from '@chakra-ui/button';
import { ChevronDownIcon } from '@chakra-ui/icons';
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
import { usePageTitle, useClientIsMobile, usePageProps } from '../hooks';
import { TITLE } from '../config';
import Head from 'next/head';

const contentBodyWidth = 600;

const NavBarIconButton: typeof IconButton = (props) => (
  <IconButton rounded="full" variant="ghost" {...props} />
);

const PageLayout: FC = ({ children }) => {
  const { subPages, originalRepositoryUrl } = usePageProps();
  const currentPageTitle = usePageTitle();
  const clientIsMobile = useClientIsMobile();

  return (
    <>
      <Head>
        <title>{currentPageTitle}</title>
      </Head>
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
                  disabled={currentPageTitle === TITLE}
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
    </>
  );
};

export default PageLayout;

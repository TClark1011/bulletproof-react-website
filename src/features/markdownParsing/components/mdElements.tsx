import {
  Code,
  Link,
  LinkProps,
  ListItem,
  OrderedList,
  UnorderedList,
  CodeProps,
} from '@chakra-ui/layout';
import { CSSObject } from '@chakra-ui/styled-system';
import { chakra } from '@chakra-ui/system';
import { useColorModeValue } from '@chakra-ui/color-mode';
import useLinkFixer from '../hooks/useLinkFixer';
import getCodeLangFromClassName from '../utils/getCodeLangFromClassName';
import SyntaxHighlighter from '../lib/SyntaxHighlighter';
import { manuallyCheckForJs } from '../utils/manuallyCheckForJs';

const createMdBlock = (
  component: Parameters<typeof chakra>[0],
  styles: CSSObject = {}
) =>
  chakra(component, {
    baseStyle: {
      marginBottom: 4,
      ...styles,
    },
  });
export const PreFormatted = createMdBlock('pre', {
  whiteSpace: 'pre-wrap',
});
export const Paragraph = createMdBlock('p');
export const H1 = createMdBlock('h1', {
  fontSize: '4xl',
  marginBottom: 0,
  // Layout for the Badges that appear underneath the title on the home page
  '&#bulletproof-react-- + p': {
    display: 'flex',
    '& > a + a': {
      marginLeft: 2,
    },
  },
});
export const H2 = createMdBlock('h2', {
  fontSize: '2xl',
  marginBottom: 0,
});
export const H3 = createMdBlock('h3', {
  fontSize: 'xl',
  marginBottom: 0,
});
export const H4 = createMdBlock('h4', {
  fontSize: 'md',
  fontWeight: 'bold',
  marginBottom: 0,
});
export const AdjustedLink = ({ href, ...props }: LinkProps) => {
  const color = useColorModeValue('blue.500', 'blue.300');
  const linkFixer = useLinkFixer();
  return <Link href={linkFixer(href || '')} color={color} {...props} />;
};
export const Li = createMdBlock(ListItem, {
  marginBottom: 0,
  '& > p': {
    marginBottom: 0,
  },
});
const listStyles: CSSObject = {
  '& ol, & ul': {
    marginBottom: 0,
  },
};
export const Ul = createMdBlock(UnorderedList, listStyles);
export const Ol = createMdBlock(OrderedList, listStyles);
export const CodeSnippet = ({
  children,
  className,
  ...props
}: CodeProps & { children: string }) => {
  const bgColor = useColorModeValue('rgb(245, 242, 240)', 'rgb(46, 52, 64)');
  const lang =
    getCodeLangFromClassName(className || '') ||
    (manuallyCheckForJs(children) && 'js');
  const isLong = children.length > 100;
  return lang ? (
    <SyntaxHighlighter language={lang} data-lang={lang}>
      {children}
    </SyntaxHighlighter>
  ) : (
    <Code
      background={bgColor}
      {...props}
      style={isLong ? { width: '100%' } : {}}
      {...(isLong && { padding: 2 })}
    >
      {children}
    </Code>
  );
};

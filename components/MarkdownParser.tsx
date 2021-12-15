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
import Markdown from 'markdown-to-jsx';
import { useColorModeValue } from '@chakra-ui/color-mode';
import usePageProps from '../hooks/usePageProps';
import useIsOnHomepage from '../hooks/useIsOnHomePage';
import { identity, pipe, test } from 'rambda';
import useLinkFix from '../hooks/useLinkFix';
import fixMarkdownLineBreaks from '../utils/fixMarkdownLineBreaks';
import getCodeLangFromClassName from '../utils/getCodeLangFromClassName';
import { Prism } from 'react-syntax-highlighter';
import { theme } from '../lib/chakra';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import SyntaxHighlighter from '../lib/SyntaxHighlighter';

const manuallyCheckForJs = (code: string) =>
  [/import \{/g, /(const|let|var) [\w\d]+ =/g].some((item) => item.test(code));

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

const PreFormatted = createMdBlock('pre', {
  whiteSpace: 'pre-wrap',
});

const Paragraph = createMdBlock('p');

const H1 = createMdBlock('h1', {
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
const H2 = createMdBlock('h2', {
  fontSize: '2xl',
  marginBottom: 0,
});

const H3 = createMdBlock('h3', {
  fontSize: 'xl',
  marginBottom: 0,
});

const H4 = createMdBlock('h4', {
  fontSize: 'md',
  fontWeight: 'bold',
  marginBottom: 0,
});

const AdjustedLink = ({ href, ...props }: LinkProps) => {
  const color = useColorModeValue('blue.500', 'blue.300');
  const fixedLink = useLinkFix(href || '');
  return <Link href={fixedLink} color={color} {...props} />;
};

const Li = createMdBlock(ListItem, {
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

const Ul = createMdBlock(UnorderedList, listStyles);
const Ol = createMdBlock(OrderedList, listStyles);

const CodeSnippet = ({
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

const MarkdownParser = () => {
  const { text } = usePageProps();
  return (
    <Markdown
      className="md"
      options={{
        overrides: {
          code: CodeSnippet,
          p: Paragraph,
          pre: PreFormatted,
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          a: AdjustedLink,
          ul: Ul,
          ol: Ol,
          li: Li,
        },
      }}
    >
      {fixMarkdownLineBreaks(text)}
    </Markdown>
  );
};

export default MarkdownParser;

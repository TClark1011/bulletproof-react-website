import {
  Code,
  Link,
  LinkProps,
  List,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/layout';
import { CSSObject } from '@chakra-ui/styled-system';
import { chakra } from '@chakra-ui/system';
import Markdown from 'markdown-to-jsx';
import { adjust } from 'rambda';
import adjustLink from '../utils/adjustLink';
import { useColorModeValue } from '@chakra-ui/color-mode';
import usePageProps from '../hooks/usePageProps';

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
  // Style code blocks
  '& > code:first-child:last-child': {
    width: '100%',
    padding: 4,
  },
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
  return <Link href={adjustLink(href || '')} color={color} {...props} />;
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

const MarkdownParser = () => {
  const { text } = usePageProps();
  return (
    <Markdown
      className="md"
      options={{
        overrides: {
          code: Code,
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
      {text.replace(/\\/g, '\n')}
    </Markdown>
  );
};

export default MarkdownParser;

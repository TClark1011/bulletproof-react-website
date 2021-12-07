import { Link } from '@chakra-ui/layout';
import { CSSObject } from '@chakra-ui/styled-system';
import { chakra } from '@chakra-ui/system';

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
  // Style code blocks
  '& > code:first-child:last-child': {
    width: '100%',
    padding: 4,
  },
});

export const Paragraph = createMdBlock('p');

export const H1 = createMdBlock('h1', {
  fontSize: '4xl',
  fontWeight: 'bold',
  marginBottom: 0,
});

export const H2 = createMdBlock('h2', {
  fontSize: 'md',
  fontWeight: 'bold',
  marginBottom: 0,
});

export const A = createMdBlock(Link, {
  color: 'blue.500',
});

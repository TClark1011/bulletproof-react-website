import { chakra, CodeProps } from '@chakra-ui/react';
import {
  Prism as BaseSyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { useColorModeValue } from '@chakra-ui/color-mode';
import getCodeLangFromClassName from '../utils/getCodeLangFromClassName';
import {
  nord as dark,
  prism as light,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { merge } from 'rambda';

const SyntaxHighlighter = ({
  style,
  language,
  ...props
}: SyntaxHighlighterProps) => {
  const syntaxStyle = useColorModeValue(light, dark);
  return (
    <BaseSyntaxHighlighter
      style={merge(style, syntaxStyle)}
      language={language}
      data-lang={language}
      {...props}
    />
  );
};

export default SyntaxHighlighter;

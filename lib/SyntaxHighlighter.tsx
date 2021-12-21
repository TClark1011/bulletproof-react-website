import {
  Prism as BaseSyntaxHighlighter,
  SyntaxHighlighterProps,
} from 'react-syntax-highlighter';
import { nord as colorScheme } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const SyntaxHighlighter = ({
  style,
  language,
  ...props
}: SyntaxHighlighterProps) => {
  return (
    <BaseSyntaxHighlighter
      style={colorScheme}
      customStyle={style}
      language={language}
      data-lang={language}
      {...props}
    />
  );
};

export default SyntaxHighlighter;

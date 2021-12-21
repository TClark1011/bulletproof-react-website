import Markdown from 'markdown-to-jsx';
import usePageProps from '../../../hooks/usePageProps';
import fixMarkdownLineBreaks from '../utils/fixMarkdownLineBreaks';
import {
  CodeSnippet,
  Paragraph,
  PreFormatted,
  H1,
  H2,
  H3,
  H4,
  AdjustedLink,
  Ul,
  Ol,
  Li,
} from './mdElements';

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

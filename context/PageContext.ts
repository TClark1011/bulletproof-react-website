import { createContext } from 'react';
import MarkdownPageProps from '../types/MarkdownPageProps';

const PageContext = createContext<MarkdownPageProps>({
  originalRepositoryUrl: '',
  subPages: [],
  text: '',
});

export default PageContext;

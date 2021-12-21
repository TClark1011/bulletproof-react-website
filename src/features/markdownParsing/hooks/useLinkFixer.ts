import { pipe, replace } from 'rambda';
import {adjustLink} from '@/features/markdownParsing/utils';
import {updateWhen} from '@/utils';
import {  usePageProps, useIsOnHomePage } from '@/hooks';

const pathBackStepRegex = /^(\.\.\/)/;
const convertDocsRelativePathToRoot = (ogUrl: string) =>
  replace(pathBackStepRegex, `${ogUrl}/tree/master/`);

const useLinkFixer = (): ((p:string) => string) => {
  const isOnHomePage = useIsOnHomePage();
  const { originalRepositoryUrl } = usePageProps();
  return pipe(
    adjustLink,
    updateWhen(
      !isOnHomePage,
      convertDocsRelativePathToRoot(originalRepositoryUrl)
    )
  );
};

export default useLinkFixer;

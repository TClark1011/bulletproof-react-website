import { pipe, replace } from 'rambda';
import adjustLink from '../utils/adjustLink';
import updateWhen from '../utils/updateWhen';
import useIsOnHomepage from './useIsOnHomePage';
import usePageProps from './usePageProps';

const pathBackStepRegex = /^(\.\.\/)/;
const convertDocsRelativePathToRoot = (ogUrl: string) =>
  replace(pathBackStepRegex, `${ogUrl}/tree/master/`);

const useLinkFix = (url: string) => {
  const isOnHomePage = useIsOnHomepage();
  const { originalRepositoryUrl } = usePageProps();
  return pipe(
    adjustLink,
    updateWhen(
      !isOnHomePage,
      convertDocsRelativePathToRoot(originalRepositoryUrl)
    )
  )(url || '');
};

export default useLinkFix;

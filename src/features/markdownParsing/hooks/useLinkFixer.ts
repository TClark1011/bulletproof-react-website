import { pipe, replace } from 'rambda';
import adjustLink from '../utils/adjustLink';
import updateWhen from '../../../utils/updateWhen';
import useIsOnHomepage from '../../../hooks/useIsOnHomePage';
import usePageProps from '../../../hooks/usePageProps';

const pathBackStepRegex = /^(\.\.\/)/;
const convertDocsRelativePathToRoot = (ogUrl: string) =>
  replace(pathBackStepRegex, `${ogUrl}/tree/master/`);

const useLinkFixer = (): ((p:string) => string) => {
  const isOnHomePage = useIsOnHomepage();
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

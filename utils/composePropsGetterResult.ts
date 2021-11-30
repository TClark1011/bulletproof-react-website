import { GetStaticPropsResult } from 'next';

const composePropsGetterResult = <Props extends {}>(
  props: Props
): GetStaticPropsResult<Props> => ({
  props,
});

export default composePropsGetterResult;

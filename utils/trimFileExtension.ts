import removeFromString from './removeFromString';

const fileExtensionRegex = /(\.[A-z]{2,4})$/;

const trimFileExtension: (p: string) => string =
  removeFromString(fileExtensionRegex);

export default trimFileExtension;

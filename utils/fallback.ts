const fallback =
  <T>(fallback: T) =>
  (value?: T) =>
    value || fallback;

export default fallback;

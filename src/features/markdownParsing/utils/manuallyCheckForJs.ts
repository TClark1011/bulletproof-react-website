const manuallyCheckForJs = (code: string) => [/import \{/g, /(const|let|var) [\w\d]+ =/g].some((item) => item.test(code));

export default manuallyCheckForJs;

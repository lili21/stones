export const urlToFilePath = (url: string) => {
  let lastCharater = url[url.length - 1];
  if (lastCharater === '/') return `${url}index.tsx`

  return `${url}.tsx`
}

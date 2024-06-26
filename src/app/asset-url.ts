// In single-spa, the assets need to be loaded from a dynamic location,
// instead of hard coded to `/assets`. We use webpack public path for this.
// See https://webpack.js.org/guides/public-path/#root

export function assetUrl(url: string, appName: string): string {
  // @ts-ignore
  const publicPath = `${window.location.origin}/${appName}`;
  const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
  const urlPrefix = url.startsWith('/') ? '' : '/';
  const srcUrl = `${publicPath}${publicPathSuffix}assets${urlPrefix}${url}`;
  return srcUrl;
}

import { ReactESMPreloadFeRouteItem, ReactESMFeRouteItem } from 'ssr-types-react'
import { normalizePath } from 'ssr-common-utils'
import { pathToRegexp } from 'path-to-regexp'
const preloadComponent = async (Routes: ReactESMPreloadFeRouteItem[], base?: string) => {
  for (const route of Routes) {
    const { component, path } = route
    let pathname = location.pathname
    if (base) {
      pathname = normalizePath(pathname, base)
    }
    if (component.name === 'dynamicComponent' && pathToRegexp(path).test(pathname)) {
      route.component = (await (component as ReactESMFeRouteItem['component'])()).default
    }
  }
  return Routes
}

export { preloadComponent }

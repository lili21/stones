import { createContext, useContext } from 'react'
import { Page } from '../ssr/types'

type SingleRoute = {
  path: string;
  exact?: boolean;
  getComponent: () => any
}

export const routes: SingleRoute[] = [
  {
    path: '/',
    exact: true,
    getComponent: () => import('./pages/index')
  },
  {
    path: '/test',
    getComponent: () => import('./pages/test')
  }
]

type StonesContextType = {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

export const StonesContext = createContext<StonesContextType>({} as any)

const getServerData = async (to) => {
  let res = await fetch(`/data/${to}`)
  return await res.json()
}

export const useStones = () => {
  let { setActivePage } = useContext(StonesContext)

  return {
    navigate: async (to: string) => {
      let [props, { default: component }] = await Promise.all([
        getServerData(to),
        routes.find((route) => route.path === to).getComponent()
      ])

      setActivePage({ path: to, component, props })
      history.pushState(null, '', to)
    }
  }
}

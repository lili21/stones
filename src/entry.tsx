import ReactDOM from 'react-dom'
import { Page } from '../ssr/types'
import { createElement, useState } from 'react'
import { StonesContext, routes } from './context'

type Props = {
  page?: Page;
}

export const App = ({ page }: Props) => {
  let [activePage, setActivePage] = useState(page)

  return <StonesContext.Provider value={{ activePage, setActivePage }}>
    {createElement(activePage.component, activePage.props)}
  </StonesContext.Provider>
}

const hydrate = async () => {
  let activeRoute = routes.find(route => route.path = window.location.pathname)

  let { default: component } = await activeRoute.getComponent()

  ReactDOM.hydrate(
    <App
      page={{
        props: (window as any)._STONES_PROPS_,
        path: window.location.pathname,
        component
      }}
      />, document.getElementById('app')
  )
}
// @ts-ignore
if (!import.meta.env.SSR) hydrate();
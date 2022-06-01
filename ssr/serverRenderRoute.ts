import { RequestHandler } from 'express-serve-static-core';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { ViteDevServer } from 'vite'
import { pageLoader } from './pageLoader'

type Props = {
  vite: ViteDevServer
}

export const serverRenderRoute = ({ vite }: Props): RequestHandler => async(req, res) => {
  const url = req.originalUrl;
  try {
    let { template, Page, App, props } = await pageLoader({
      url,
      vite
    })

    const appHtml = await ReactDOMServer.renderToString(
      React.createElement(App, {
        page: {
          props,
          path: req.originalUrl,
          component: Page
        }
      })
    )

    const html = template.replace(`<!--app-html-->`, appHtml).replace('</head>', `<script>window._STONES_PROPS_ = ${JSON.stringify(props)}</script></head>`)
  res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

  } catch (e: any) {
    vite.ssrFixStacktrace(e);
    console.error(e);
    res.status(500).end(e.message);
  }

}
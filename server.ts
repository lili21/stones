import express from "express";
import { createServer as createViteServer } from "vite";
import { serverRenderRoute } from "./ssr/serverRenderRoute";
import { getServerSideProps } from './ssr/getServerSideProps'

async function createServer() {
  // creates a standard express app
  const app = express();
  
  // create vite using ssr mode
  const vite = await createViteServer({
    server: { middlewareMode: "ssr" },
  });
  // register vite's middleware
  app.use(vite.middlewares);

  app.use('/data/*', getServerSideProps({ vite }))
  
  // when a page is requested, call our serverRenderRoute method
  app.use("*", serverRenderRoute({ vite }));

  // start the server on port 3000
  app.listen(3000, () => console.log("listening on :3000"));
}

createServer();
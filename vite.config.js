import reactRefresh from "@vitejs/plugin-react-refresh";

export default {
  // enables hot module replacement for react
  plugins: [reactRefresh()],
  esbuild: {
    // injects the React import statement to jsx files
    jsxInject: `import React from 'react';`,
  },
  build: {
    minify: false,
  },
};
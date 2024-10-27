import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        assets: path.resolve(__dirname, "./src/assets"),
        constants: path.resolve(__dirname, "./src/constants"),
        services: path.resolve(__dirname, "./src/services"),
        stores: path.resolve(__dirname, "./src/stores"),
        configs: path.resolve(__dirname, "./src/configs"),
        apis: path.resolve(__dirname, "./src/apis"),
        components: path.resolve(__dirname, "./src/components"),
        helpers: path.resolve(__dirname, "./src/helpers"),
        routes: path.resolve(__dirname, "./src/routes"),
        container: path.resolve(__dirname, "./src/container"),
        pages: path.resolve(__dirname, "./src/pages"),
        layouts: path.resolve(__dirname, "./src/layouts"),
        hooks: path.resolve(__dirname, "./src/hooks"),
      },
    },
    plugins: [react()],
    define: {
      APP_VERSION: JSON.stringify(env.npm_package_version),
      "import.meta.env.REACT_APP_API_URL": JSON.stringify(env.REACT_APP_API_URL),
      "import.meta.env.REACT_APP_DRAWER_WIDTH": JSON.stringify(env.REACT_APP_DRAWER_WIDTH),
      "import.meta.env.REACT_APP_THEME": JSON.stringify(env.REACT_APP_THEME),
      "import.meta.env.REACT_APP_LANGUAGE": JSON.stringify(env.REACT_APP_LANGUAGE),
      "import.meta.env.REACT_APP_DELAY_GET_DATA": JSON.stringify(env.REACT_APP_DELAY_GET_DATA),
      "import.meta.env.REACT_APP_DEBOUNCE_TIME": JSON.stringify(env.REACT_APP_DEBOUNCE_TIME),
      "import.meta.env.REACT_APP_MAX_SNACKBAR": JSON.stringify(env.REACT_APP_MAX_SNACKBAR),
      "import.meta.env.REACT_APP_AUTO_HIDE_SNACKBAR": JSON.stringify(env.REACT_APP_AUTO_HIDE_SNACKBAR),
    },
    esbuild: {
      loader: "jsx",
    },
  };
});

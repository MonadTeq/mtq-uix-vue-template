/// <reference types="vitest/config" />

import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"
import AutoImport from "unplugin-auto-import/vite"
import SvgComponent from "unplugin-svg-component/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig, loadEnv } from "vite"
import { ViteMcp } from "vite-plugin-mcp"
import svgLoader from "vite-svg-loader"

// Configuring Vite: https://cn.vite.dev/config
export default defineConfig(({ mode }) => {
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd(), "") as ImportMetaEnv
  return {
    // Public base path used in development or build
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        // The @ alias points to the src directory
        "@": resolve(__dirname, "src"),
        // The @@ alias points to the src/common directory
        "@@": resolve(__dirname, "src/common")
      }
    },
    // Development server configuration
    server: {
      // Whether to listen on all addresses
      host: true,
      // Port number
      port: 3333,
      // Whether to exit directly when the port is occupied
      strictPort: false,
      // Whether to open the browser automatically
      open: true,
      // Reverse proxy
      proxy: {
        "/api/v1": {
          target: "https://apifoxmock.com/m1/2930465-2145633-default",
          // Whether it is WebSocket
          ws: false,
          // Whether to allow cross-origin
          changeOrigin: true
        }
      },
      // Whether to allow cross-origin
      cors: true,
      // Pre-warm frequently used files to improve initial page load speed
      warmup: {
        clientFiles: [
          "./src/layouts/**/*.*",
          "./src/pinia/**/*.*",
          "./src/router/**/*.*"
        ]
      }
    },
    // Build configuration
    build: {
      // Customize the underlying Rollup bundling configuration
      rollupOptions: {
        output: {
          /**
           * @name Chunking strategy
           * @description 1. Note that these package names must exist, otherwise the build will error
           * @description 2. If you don't want to customize the chunk splitting strategy, you can simply remove this configuration
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table"]
          }
        }
      },
      // Whether to enable the gzip compressed size report; disabling it slightly improves build performance
      reportCompressedSize: false,
      // Warn when a single chunk file exceeds 2048kB
      chunkSizeWarningLimit: 2048
    },
    // Minifier
    esbuild:
      mode === "development"
        ? undefined
        : {
            // Remove console.log during build
            pure: ["console.log"],
            // Remove debugger during build
            drop: ["debugger"],
            // Remove all comments during build
            legalComments: "none"
          },
    // Dependency pre-bundling
    optimizeDeps: {
      include: ["element-plus/es/components/*/style/css"]
    },
    // CSS-related configuration
    css: {
      // Run the CSS preprocessor in threads
      preprocessorMaxWorkers: true
    },
    // Plugin configuration
    plugins: [
      vue(),
      // Support importing SVG files as Vue components
      svgLoader({
        defaultImport: "url",
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false
                }
              }
            }
          ]
        }
      }),
      // Auto-generate the SvgIcon component and SVG sprite sheet
      SvgComponent({
        iconDir: [resolve(__dirname, "src/common/assets/icons")],
        preserveColor: resolve(__dirname, "src/common/assets/icons/preserve-color"),
        dts: true,
        dtsDir: resolve(__dirname, "types/auto")
      }),
      // Atomic CSS
      UnoCSS(),
      // Auto-import APIs on demand
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        dts: "types/auto/auto-imports.d.ts",
        resolvers: [ElementPlusResolver({ importStyle: false })]
      }),
      // Auto-import components on demand
      Components({
        dts: "types/auto/components.d.ts",
        resolvers: [ElementPlusResolver({ importStyle: false })]
      }),
      // Enable the MCP Server for the project
      ViteMcp()
    ],
    // Configuring Vitest: https://cn.vitest.dev/config
    test: {
      include: ["tests/**/*.test.{ts,js}"],
      environment: "happy-dom",
      server: {
        deps: {
          inline: ["element-plus"]
        }
      }
    }
  }
})

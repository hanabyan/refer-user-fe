/* eslint-disable func-names */
/* eslint-disable global-require */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'vuelidate',
    ],

    css: [
      'app.styl',
    ],

    extras: [
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    framework: {
      // iconSet: 'ionicons-v4',
      iconSet: 'fontawesome-v5',
      // lang: 'de', // Quasar language

      // all: true, // --- includes everything; for dev only!

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QBanner',
        'QBtnDropdown',
        'QInput',
        'QSelect',
        'QFooter',
        'QTable',
        'QCard',
        'QCardSection',
        'QSeparator',
        'QForm',
        'QUploader',
        'QField',
        'QTd',
        'QDialog',
        'QCardActions',
        'QAvatar',
        'QSpace',
        'QRadio',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QCheckbox',
        'QCircularProgress',
      ],

      directives: [
        'Ripple',
        'ClosePopup',
      ],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
      ],
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      publicPath: 'https://refer.co.id/user',
      env: {
        APP_BASE: ctx.dev ? JSON.stringify('/') : JSON.stringify('https://refer.co.id/user'),
        AXIOS_BASE: ctx.dev ? JSON.stringify('/user') : JSON.stringify('/api/user'),
        API_BASE: ctx.dev ? JSON.stringify('/user') : JSON.stringify('https://refer.co.id/api/user'),
        REFER_PORTAL: JSON.stringify('https://refer.co.id'),
      },
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
          },
        });
      },
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        '/user': {
          target: 'http://localhost:3080/netwerk/refer',
          changeOrigin: true,
          // pathRewrite: {
          //   '^/api': '',
          // },
        },
      },
    },

    // animations: 'all', // --- includes all animations
    animations: [],

    ssr: {
      pwa: false,
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'refer-user-fe',
        // short_name: 'refer-user-fe',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'refer-user-fe'
      }
    }
  }
}

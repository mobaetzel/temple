const path = require('path');
const glob = require('glob');

const markdownIt = require('markdown-it');
const markdownItAnchor = require("markdown-it-anchor");
const markdownItTableOfContents = require("markdown-it-table-of-contents");
const markdownItPrism = require("markdown-it-prism");

const dynamicRoutes = getDynamicPaths({
  '/posts': '*.md'
});

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Finn Moritz Bätzel',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Der Blog eines Günders und Cloud-Enthusiast'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono|Nunito|Nunito+Sans&display=swap'
      },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '~/styles/main.css',
    '~/styles/override.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/sitemap',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        include: path.resolve(__dirname, 'posts'),
        loader: 'frontmatter-markdown-loader',
        options: {
          markdownIt: markdownIt({html: true}).use(markdownItAnchor).use(markdownItTableOfContents).use(markdownItPrism)
        }
      });
    },
    analyze: true,
  },
  generate: {
    routes: dynamicRoutes
  },
  sitemap: {
    hostname: 'https://mocodes.de',
    gzip: true,
  }
}

function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      let filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, {cwd: 'posts'})
        .map(filepath => `${url}/${path.basename(filepath, '.md')}`);
    })
  );
}

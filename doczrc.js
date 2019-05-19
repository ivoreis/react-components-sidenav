import pkg from './package.json';
import doczPluginGithubPage from 'docz-plugin-github-page';

export default {
  plugins: [doczPluginGithubPage()],
  title: 'Library name',
  public: './public',
  description: pkg.description,
  base: `/${pkg.name}/`,
  version: pkg.version,
  propsParser: false,
  hashRouter: true,
  typescript: true,
  themeConfig: {
    logo: {
      src: '/react-components-sidenav/public/logo.png',
      width: 200,
    },
    colors: {
      primary: '#000000',
    },
  },
};

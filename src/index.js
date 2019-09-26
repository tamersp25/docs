import appConfig from '../config.json';
import docsifyConfig from './scripts/docsifyConfig';
import pendo from './scripts/vendor/initializePendo';

import './styles/sidebar.scss';
import './styles/base.scss';
import './styles/markdown.scss';
import './styles/quickstart.scss';
import './styles/coverpage.scss';
import './styles/search.scss';

window.config = appConfig;
window.$docsify = docsifyConfig;

pendo(appConfig.pendoKey, appConfig.apiRoot);

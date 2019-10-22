import docsifyConfig from './scripts/docsifyConfig';
import pendo from './scripts/vendor/initializePendo';
import './scripts/developerQuiz';

import './styles/sidebar.scss';
import './styles/base.scss';
import './styles/markdown.scss';
import './styles/quickstart.scss';
import './styles/coverpage.scss';
import './styles/search.scss';

window.$docsify = docsifyConfig;

// Set app config to window variable from webpack DefinePlugin
window.config = config;

pendo(window.config.pendoKey, window.config.apiRoot);

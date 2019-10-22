import initializeDocsify from './scripts/docsifyConfig';
import initializeSentry from './scripts/vendor/initializeSentry';
import pendo from './scripts/vendor/initializePendo';
import './scripts/developerQuiz';

import './styles/sidebar.scss';
import './styles/base.scss';
import './styles/markdown.scss';
import './styles/quickstart.scss';
import './styles/coverpage.scss';
import './styles/search.scss';


// Expose global config to window so it can be used easily in random scripts
window.config = config;

initializeSentry(config.sentryDSN, config.nodeEnv);
initializeDocsify();
pendo(config.pendoKey, config.apiRoot);

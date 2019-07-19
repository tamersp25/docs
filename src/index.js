import config from './scripts/docsifyConfig';
import './base.scss';

window.$docsify = config;

// TODO: Find out what this does
document.getElementById('new-issue-link').addEventListener('click', function() {
  window.open(
    'https://github.com/veritone/docs/issues/new?title=' +
      encodeURIComponent(
        'Issue on page: ' + (document.location.hash.slice(2) || 'Home')
      )
  );
});

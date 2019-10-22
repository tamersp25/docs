import * as Sentry from '@sentry/browser';

export default function initializeSentry(dsn, environment) {
  Sentry.init({dsn, environment});
}

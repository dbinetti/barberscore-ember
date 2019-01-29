import * as Sentry from '@sentry/browser'
import config from './config/environment';

Sentry.init({
  dsn: config.APP.SENTRY_DSN,
  environment: config.environment,
  sendDefaultPii: true,
  integrations: [new Sentry.Integrations.Ember()],
  release: config.APP.HEROKU_RELEASE_VERSION,
  beforeSend: (event, hint) => {
   if (config.environment !== 'production') {
    // eslint-disable-next-line
    console.error(hint.originalException || hint.syntheticException);
    return null; // this drops the event and nothing will be send to sentry
   }
   return event;
  }
});

export default Sentry;

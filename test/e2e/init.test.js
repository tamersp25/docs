const WORD_THAT_SHOULD_BE_ON_EVERY_PAGE = 'Veritone';
const WORD_THAT_SHOULD_NOT_BE_ON_ANY_PAGE = '092uh4gwr02hwg4h0ionwrbi24g8';

Feature('site init');

Scenario('main page loads', I => {
  I.amOnPage('/');
  I.see(WORD_THAT_SHOULD_BE_ON_EVERY_PAGE);
});

Scenario('search works', I => {
  I.amOnPage('/');
  I.fillField('.search input', WORD_THAT_SHOULD_BE_ON_EVERY_PAGE);
  I.seeElement('.matching-post');
  I.fillField('.search input', WORD_THAT_SHOULD_NOT_BE_ON_ANY_PAGE);
  I.dontSeeElement('.matching-post');
});

Scenario('logo goes to top', I => {
  I.amOnPage('/#/apps/');
  I.click('.app-name-link');
  I.wait(0.1);  // Need to wait for hash to be added.  Race condition.
  I.seeCurrentUrlEquals('/#/');
});

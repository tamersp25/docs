const SIDEBAR_CONTEXT = { css: '.sidebar-nav' };
const OVERVIEW_TITLE = 'aiWARE Overview';
const ARCHITECTURE_TITLE = 'Architecture Overview';
const DEVELOPER_TITLE = 'Developer';
const ENGINES_TITLE = 'Building Engines';
const COGNITIVE_TITLE = 'Building Cognitive Engines';
const QUICKSTART_TITLE = 'Quickstart';
const ENGINE_DEVELOPER_TITLE = 'Engine Developer';
const ML_INTEGRATOR_TITLE = 'ML Integrator';
const ML_EXPLORER = {
  TITLE: 'ML Explorer',
  URL: '/#/quickstart/ml-explorer/',
  CONTENT: 'Build Intelligence into your App'
};
const APP_DEVELOPER = {
  TITLE: 'App Developer',
  URL: '/#/quickstart/app-developer/',
  CONTENT: 'Build an AI-Powered App on aiWARE'
};

Feature('sidebar');

Scenario('sidebar loads', I => {
  I.amOnPage('/#/overview/');
  I.see('aiWARE Overview');
});

Scenario('sidebar collapse feature', I => {

  I.amOnPage('/#/overview/');
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT); // See self
  I.see(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT); // See child page
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT); // See sibling page
  I.dontSee(ENGINES_TITLE, SIDEBAR_CONTEXT); // DON'T see niece page
  I.dontSee(COGNITIVE_TITLE, SIDEBAR_CONTEXT); // DON'T see grand-niece page

  I.click(DEVELOPER_TITLE, SIDEBAR_CONTEXT);
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT); // See sibling page
  I.dontSee(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT); // DON'T see nephew page
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT); // See self
  I.see(ENGINES_TITLE, SIDEBAR_CONTEXT); // See child
  I.dontSee(COGNITIVE_TITLE, SIDEBAR_CONTEXT); // DON'T see grandchild

  I.click(ENGINES_TITLE, SIDEBAR_CONTEXT);
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT);
  I.dontSee(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT);
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT);
  I.see(ENGINES_TITLE, SIDEBAR_CONTEXT);
  I.see(COGNITIVE_TITLE, SIDEBAR_CONTEXT);
  I.dontSee('Biometrics', SIDEBAR_CONTEXT); // DON'T see grandchild
  I.dontSee('Face Detection', SIDEBAR_CONTEXT); // DON'T see great grandchild

  I.click(COGNITIVE_TITLE, SIDEBAR_CONTEXT);
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT);
  I.dontSee(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT);
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT);
  I.see(ENGINES_TITLE, SIDEBAR_CONTEXT);
  I.see(COGNITIVE_TITLE, SIDEBAR_CONTEXT);
  I.see('Biometrics', SIDEBAR_CONTEXT); // See non-clickable child
  I.see('Face Detection', SIDEBAR_CONTEXT); // See grandchild with non-clickable parent

});

Scenario('Sidebar sections with extra DOM layers collapse correctly', I => {
  I.amOnPage('/#/overview/');
  I.click(QUICKSTART_TITLE);
  I.click(ENGINE_DEVELOPER_TITLE);
  I.see(ENGINE_DEVELOPER_TITLE); // See self
  I.see(ML_INTEGRATOR_TITLE); // See sibling
  I.see(OVERVIEW_TITLE); // See uncle
  I.dontSee(ARCHITECTURE_TITLE); // DON'T see cousin in separate top-level section
});

Scenario('App developer section loads when clicked from sidebar', I => {
  // These pages weren't loading sometimes when flipped back and forth.  We're not sure why.
  I.amOnPage('/#/quickstart/');
  clickAndVerify(APP_DEVELOPER);
  clickAndVerify(ML_EXPLORER);
  clickAndVerify(APP_DEVELOPER);
  clickAndVerify(ML_EXPLORER);

  function clickAndVerify(section) {
    I.click(section.TITLE);
    I.seeCurrentUrlEquals(section.URL);
    I.see(section.CONTENT);
  }
});

Scenario('navigate to applications', I => {
  I.amOnPage('/#/overview/');
  I.click('Applications', SIDEBAR_CONTEXT);
  I.seeCurrentUrlEquals('/#/apps/');
  I.see('CMS', { css: '.sidebar-nav .active' });
});

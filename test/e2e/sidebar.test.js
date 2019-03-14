const SIDEBAR_CONTEXT = {css: '.sidebar-nav'};

Feature('sidebar');

Scenario('sidebar loads', I => {
  I.amOnPage('/');
  I.see('aiWARE Overview');
});

Scenario('sidebar collapse feature', I => {
  const OVERVIEW_TITLE = 'aiWARE Overview';
  const ARCHITECTURE_TITLE = 'Architecture Overview';
  const DEVELOPER_TITLE = 'Developer';
  const ENGINES_TITLE = 'Building Engines';
  const COGNITIVE_TITLE = 'Building a Cognitive Engine';

  I.amOnPage('/');
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT);  // See self
  I.see(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT);  // See child page
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT);  // See sibling page
  I.dontSee(ENGINES_TITLE, SIDEBAR_CONTEXT);  // DON'T see niece page
  I.dontSee(COGNITIVE_TITLE, SIDEBAR_CONTEXT);  // DON'T see grand-niece page

  I.click(DEVELOPER_TITLE, SIDEBAR_CONTEXT);
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT);  // See sibling page
  I.dontSee(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT);  // DON'T see nephew page
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT);  // See self
  I.see(ENGINES_TITLE, SIDEBAR_CONTEXT);  // See child
  I.dontSee(COGNITIVE_TITLE, SIDEBAR_CONTEXT);  // DON'T see grandchild

  I.click(ENGINES_TITLE, SIDEBAR_CONTEXT);
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT);
  I.dontSee(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT);
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT);
  I.see(ENGINES_TITLE, SIDEBAR_CONTEXT);
  I.see(COGNITIVE_TITLE, SIDEBAR_CONTEXT);
  I.dontSee('Biometrics', SIDEBAR_CONTEXT);  // DON'T see grandchild
  I.dontSee('Face Detection', SIDEBAR_CONTEXT);  // DON'T see great grandchild

  I.click(COGNITIVE_TITLE, SIDEBAR_CONTEXT);
  I.see(OVERVIEW_TITLE, SIDEBAR_CONTEXT);
  I.dontSee(ARCHITECTURE_TITLE, SIDEBAR_CONTEXT);
  I.see(DEVELOPER_TITLE, SIDEBAR_CONTEXT);
  I.see(ENGINES_TITLE, SIDEBAR_CONTEXT);
  I.see(COGNITIVE_TITLE, SIDEBAR_CONTEXT);
  I.see('Biometrics', SIDEBAR_CONTEXT);  // See non-clickable child
  I.see('Face Detection', SIDEBAR_CONTEXT);  // See grandchild with non-clickable parent
});

Scenario('navigate to applications', I => {
  I.amOnPage('/');
  I.click('Applications', SIDEBAR_CONTEXT);
  I.seeCurrentUrlEquals('/#/apps/');
  I.see('CMS', {css: '.sidebar-nav .active'});
});

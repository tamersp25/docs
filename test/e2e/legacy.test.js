Feature('legacy pages');

Scenario('legacy engines page goes somewhere', I => {
  I.amOnPage('/#/engines');
  I.seeCurrentUrlEquals('/#/developer/engines/');
  I.see('Engines', {css: '.content h1'});
});

Scenario('legacy vtn-standard page goes somewhere', I => {
  I.amOnPage('/#/engines/engine_standards/veri_standards');
  I.seeCurrentUrlEquals('/#/developer/engines/standards/engine-output/');
  I.see('vtn-standard', {css: '.content h1'});
});

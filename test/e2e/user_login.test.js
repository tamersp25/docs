const WORD_THAT_SHOULD_BE_ON_EVERY_PAGE = 'Veritone';
const OVERVIEW_SELECTOR = 'body > div.vui-layout.ng-scope.layout-column > vui-default-layout > md-content > ui-view > vui-overview > div > md-card.vui-tile-item.ng-scope.'
const MENU_OVERVIEW_SELECTOR = '#menu_container_2 > md-menu-content > ';
const SA_USER_NAME = 'seta+admin_1@veritone.com';
const SA_PASS_WORDS = 'Veritone123'
const GA_USER_NAME = 'hongadmin1@seta.com';
const GA_PASS_WORDS = 'Seta@123'

Feature('User Login');

Scenario('Main page loads', I => {
  I.amOnPage('/');
  I.wait(5);
  I.see(WORD_THAT_SHOULD_BE_ON_EVERY_PAGE);
});

Scenario('Login with Super Admin', I => {
  I.fillField('//*[@id="input_0"]', SA_USER_NAME);
  I.dontSee('This is an invalid email.');
  I.fillField('//*[@id="input_1"]', SA_PASS_WORDS);
  I.click('body > div.vui-layout.ng-scope.layout-column > md-content > div > div.vui-card-row.vui-card-shadow.layout-row > div > div > div.vui-md-card-content > ng-include > form > div > button');
  I.dontSee('An error has occurred');
  I.dontSee('Email or Password is incorrect.');
});

Scenario('Go to Admin overview page', I => {
  I.wait(10);
  I.see('Profile', OVERVIEW_SELECTOR + '_md.flex-order-0.flex-none');
  I.see('All Users', OVERVIEW_SELECTOR + '_md.flex-order-1.flex-none');
  I.see('All Orgs', OVERVIEW_SELECTOR + '_md.flex-order-2.flex-none');
  I.see('All Applications', OVERVIEW_SELECTOR + '_md.flex-order-3.flex-none');
  I.see('All Engines', OVERVIEW_SELECTOR + '_md.flex-order-4.flex-none');
  I.see('Edge Overview', OVERVIEW_SELECTOR + '_md.flex-order-6.flex-none');
  I.see('aiWare Edge', OVERVIEW_SELECTOR + '_md.flex-order-7.flex-none');
  I.see('Configuration', OVERVIEW_SELECTOR + '_md.flex-order-8.flex-none');

  I.click('body > div.vui-layout.ng-scope.layout-column > vui-default-layout > vui-menu-bar > md-menu-bar > div > md-menu');
  I.wait(3);
  I.see('Overview', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(1)');
  I.see('Profile', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(2)');
  I.see('All Users', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(3)');
  I.see('All Orgs', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(4)');
  I.see('All Applications', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(5)');
  I.see('All Engines', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(6)');
  I.see('Edge Overview', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(7)');
  I.see('aiWare', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(9)');
  I.see('Configuration', MENU_OVERVIEW_SELECTOR + 'md-menu-item:nth-child(10)');
 

});
 Scenario('Logout of Super Admin', I=>{
  I.refreshPage();
  I.click('body > div.vui-layout.ng-scope.layout-column > vui-default-layout > vui-veritone-app-header > md-toolbar > div > md-menu:nth-child(6) > button');
  I.wait(2);
  I.click('#menu_container_1 > md-menu-content > md-menu-item:nth-child(3) > button ')
 });

 Scenario('Login with General Admin', I => {
  I.wait(10);
  I.fillField('//*[@id="input_0"]', GA_USER_NAME);
  I.dontSee('This is an invalid email.');
  I.fillField('//*[@id="input_1"]', GA_PASS_WORDS);
  I.click('body > div.vui-layout.ng-scope.layout-column > md-content > div > div.vui-card-row.vui-card-shadow.layout-row > div > div > div.vui-md-card-content > ng-include > form > div > button');
  I.dontSee('An error has occurred');
  I.dontSee('Email or Password is incorrect.');

});

Scenario('Go to Discovery  overview page', I => {
  I.waitForNavigation();
  I.wait(10);
  I.see('Watchlist','#ui_base_elm > div.header.withsearch > div.s_wrap > ul > li:nth-child(2)');
  I.click('#ui_base_elm > div.header.withsearch > div.ng-scope > div.loggedin.ng-scope > vui-veritone-app-header > md-toolbar > div > md-menu:nth-child(5) > button');
  I.wait(2);
  I.see('Discovery','#menu_container_0 > md-menu-content > md-menu-item:nth-child(1)');
  I.see('CMS','#menu_container_0 > md-menu-content > md-menu-item:nth-child(2)');
  I.see('Collections','#menu_container_0 > md-menu-content > md-menu-item:nth-child(3)');
  I.see('Admin','#menu_container_0 > md-menu-content > md-menu-item:nth-child(4)');
  I.wait(2);
  I.click('#menu_container_0 > md-menu-content > md-menu-item:nth-child(4) > a');
  I.wait(7);
  I.see('Profile', OVERVIEW_SELECTOR + '_md.flex-order-0.flex-none');
  I.see('Users', OVERVIEW_SELECTOR + '_md.flex-order-1.flex-none');
  I.see('Usage Data', OVERVIEW_SELECTOR + '_md.flex-order-2.flex-none');
  I.see('API Keys', OVERVIEW_SELECTOR + '_md.flex-order-8.flex-none');
  I.see('Conductor', OVERVIEW_SELECTOR + '_md.flex-order-10.flex-none');
  I.see('Benchmarking', OVERVIEW_SELECTOR + '_md.flex-order-11.flex-none');
  I.amOnPage('https://enterprise.stage.veritone.com/media/mentions#/mention/buy/all');
  I.wait(5);
  I.closeOtherTabs();

});

// Scenario('Swith to the Admin App in an Organization', I => {
//   I.wait(7);
//   I.see('Profile', OVERVIEW_SELECTOR + '_md.flex-order-0.flex-none');
//   I.see('Users', OVERVIEW_SELECTOR + '_md.flex-order-1.flex-none');
//   I.see('Usage Data', OVERVIEW_SELECTOR + '_md.flex-order-2.flex-none');
//   I.see('API Keys', OVERVIEW_SELECTOR + '_md.flex-order-8.flex-none');
//   I.see('Conductor', OVERVIEW_SELECTOR + '_md.flex-order-10.flex-none');
 
//   I.see('Benchmarking', OVERVIEW_SELECTOR + '_md.flex-order-11.flex-none');
//   I.wait(3);
//   I.switchToPreviousTab(2);
//   I.closeOtherTabs();
// });

// Scenario('Switch to CMS', I =>{
//   I.wait(7);
//   I.click('#ui_base_elm > div.header.withsearch > div.ng-scope > div.loggedin.ng-scope > vui-veritone-app-header > md-toolbar > div > md-menu:nth-child(5) > button');
//   I.wait(2);
//   I.see('Discovery','#menu_container_0 > md-menu-content > md-menu-item:nth-child(1)');
//   I.see('CMS','#menu_container_0 > md-menu-content > md-menu-item:nth-child(2)');
//   I.see('Collections','#menu_container_0 > md-menu-content > md-menu-item:nth-child(3)');
//   I.see('Admin','#menu_container_0 > md-menu-content > md-menu-item:nth-child(4)');
//   I.wait(2);
//   I.click('#menu_container_0 > md-menu-content > md-menu-item:nth-child(4) > 2');
// })
// Scenario('Logout of Global Admin',I=>{
//     I.refreshPage();
//     I.click('#ui_base_elm > div.header.withsearch > div.ng-scope > div.loggedin.ng-scope > vui-veritone-app-header > md-toolbar > div > md-menu:nth-child(6) > button');
//     I.click('#menu_container_1 > md-menu-content > md-menu-item:nth-child(3) > button ')
//    });
  



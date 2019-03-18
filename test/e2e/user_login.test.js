const WORD_THAT_SHOULD_BE_ON_EVERY_PAGE = 'Veritone';
const OVERVIEW_SELECTOR = 'body > div.vui-layout.ng-scope.layout-column > vui-default-layout > md-content > ui-view > vui-overview > div > md-card.vui-tile-item.ng-scope.'
const MENU_OVERVIEW_SELECTOR = '#menu_container_2 > md-menu-content > ';
const SA_USER_NAME = 'seta+admin_1@veritone.com';
const SA_PASS_WORDS = 'Veritone123'
const GA_USER_NAME = 'hongadmin1@seta.com';
const GA_PASS_WORDS = 'Seta@123';
const STAGE_DISCOVERY_APP ='https://enterprise.stage.veritone.com/media/mentions#/mention/buy/all';
const STAGE_CMS = 'https://cms.stage.veritone.com/';
const APP_LIST_ON_RIGHT_PANEL = '#ui_base_elm > div.header.withsearch > div.ng-scope > div.loggedin.ng-scope > vui-veritone-app-header > md-toolbar > div > md-menu:nth-child(5) > button'
const LOGIN_BUTTON = 'body > div.vui-layout.ng-scope.layout-column > md-content > div > div.vui-card-row.vui-card-shadow.layout-row > div > div > div.vui-md-card-content > ng-include > form > div > button';
const ADMIN_PAGE_USER_PROFILE_BUTTON = 'body > div.vui-layout.ng-scope.layout-column > vui-default-layout > vui-veritone-app-header > md-toolbar > div > md-menu:nth-child(6) > button';
const ADMIN_PAGE_USER_LOGOUT_BUTTON = '#menu_container_1 > md-menu-content > md-menu-item:nth-child(3) > button';
const RIGHT_PANEL_DISCOVERY_SWITCH = '#menu_container_0 > md-menu-content > md-menu-item:nth-child(1)';
const RIGHT_PANEL_CMS_SWITCH = '#menu_container_0 > md-menu-content > md-menu-item:nth-child(2)';
const RIGHT_PANEL_COLLECTIONS_SWITCH = '#menu_container_0 > md-menu-content > md-menu-item:nth-child(3)';
const RIGHT_PANEL_ADMIN_SWITCH = '#menu_container_0 > md-menu-content > md-menu-item:nth-child(4)';
const CMS_NEW_BUTTON = 'body > div.ng-scope.cms-container > div.vui-cms-subheader-bar.layout-row > cms-subnav-bar > md-menu > button';
const CMS_BROWSE_LEFT_PANEL = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > div > div.vui-analytics-filter-panel-tab-selector.ng-binding.ng-scope.active-header';
const CMS_FILTERS_LEFT_PANEL = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > div > div:nth-child(2)';
const CMS_SOURCES_MENU = '//div[@class="browse-list-item"]/descendant::node()/div[text()="Sources"]';
const CMS_INGESTION_JOBS_MENU = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > ul:nth-child(2) > vui-browse-tab > div > div:nth-child(5) > div';
const CMS_PROCCESSING_STATUS_MENU = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > ul:nth-child(2) > vui-browse-tab > div > div:nth-child(6) > div';
const CMS_BROWSE_STREAMS_MENU = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > ul:nth-child(2) > vui-browse-tab > div > div.browse-list-item.ng-scope.layout-column > div';
const CMS_BROWSE_SOURCES_MENU = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > ul:nth-child(2) > vui-browse-tab > div > div.streams-controls.ng-scope > div.streams-option.ng-scope.layout-row.stream-item-selected';
const CMS_BROWSE_PROGRAMS_MENU = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > ul:nth-child(2) > vui-browse-tab > div > div.streams-controls.ng-scope > div:nth-child(2)';
const CMS_BROWSE_FILES_MENU = 'body > div.ng-scope.cms-container > div:nth-child(4) > cms-left-nav > div > div > ul:nth-child(2) > vui-browse-tab > div > div.streams-controls.ng-scope > div:nth-child(3)';
const CMS_CREATE_SOURCES_BUTTON = '#source-management-container > source-list-react-wrapper > div > div > div > button';
const CMS_NEW_INGESTION_JOB_BUTTON = '#ingestion-jobs-container > ingestion-jobs-list-react-wrapper > div > div > div > button';

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
  I.click(LOGIN_BUTTON);
  I.dontSee('An error has occurred');
  I.dontSee('Email or Password is incorrect.');
});

Scenario('Go to Admin overview page', I => {
  I.waitForNavigation();
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
  I.click(ADMIN_PAGE_USER_PROFILE_BUTTON);
  I.wait(2);
  I.click(ADMIN_PAGE_USER_LOGOUT_BUTTON)
 });

 Scenario('Login with General Admin', I => {
  I.wait(10);
  I.fillField('//*[@id="input_0"]', GA_USER_NAME);
  I.dontSee('This is an invalid email.');
  I.fillField('//*[@id="input_1"]', GA_PASS_WORDS);
  I.click(LOGIN_BUTTON);
  I.dontSee('An error has occurred');
  I.dontSee('Email or Password is incorrect.');

});

Scenario('Go to Discovery  overview page', I => {
  I.waitForNavigation();
  I.wait(10);
  I.amOnPage(STAGE_DISCOVERY_APP);
  I.see('Watchlist','#ui_base_elm > div.header.withsearch > div.s_wrap > ul > li:nth-child(2)');
  I.click(APP_LIST_ON_RIGHT_PANEL);
  I.wait(2);
  I.see('Discovery', RIGHT_PANEL_DISCOVERY_SWITCH);
  I.see('CMS', RIGHT_PANEL_CMS_SWITCH);
  I.see('Collections', RIGHT_PANEL_COLLECTIONS_SWITCH);
  I.see('Admin', RIGHT_PANEL_ADMIN_SWITCH);

  
});

Scenario('Swith to the Admin App in an Organization', I=>{
  I.wait(5);
  I.click(RIGHT_PANEL_ADMIN_SWITCH);
  I.wait(7);
  I.see('Profile', OVERVIEW_SELECTOR + '_md.flex-order-0.flex-none');
  I.see('Users', OVERVIEW_SELECTOR + '_md.flex-order-1.flex-none');
  I.see('Usage Data', OVERVIEW_SELECTOR + '_md.flex-order-2.flex-none');
  I.see('API Keys', OVERVIEW_SELECTOR + '_md.flex-order-8.flex-none');
  I.see('Conductor', OVERVIEW_SELECTOR + '_md.flex-order-10.flex-none');
  I.see('Benchmarking', OVERVIEW_SELECTOR + '_md.flex-order-11.flex-none');
  I.wait(5);
  I.amOnPage(STAGE_DISCOVERY_APP);
  I.wait(10)
  I.closeOtherTabs();
  I.wait(10)
});

Scenario('Switch to CMS application', I=>{
  I.wait(10);
  I.refreshPage();
  I.wait(10);
  I.click(APP_LIST_ON_RIGHT_PANEL);
  I.wait(2);
  I.click(RIGHT_PANEL_CMS_SWITCH);   
  I.wait(10);
  I.see('NEW',CMS_NEW_BUTTON);
  I.see('BROWSE',CMS_BROWSE_LEFT_PANEL);
  I.see('FILTERS',CMS_FILTERS_LEFT_PANEL);
  I.see('Streams',CMS_BROWSE_STREAMS_MENU);
  I.see('Sources', CMS_BROWSE_SOURCES_MENU);
  I.see('Programs', CMS_BROWSE_PROGRAMS_MENU);
  I.see('Files', CMS_BROWSE_FILES_MENU);
  I.see('Sources',CMS_SOURCES_MENU);
  I.see('Ingestion Jobs',CMS_INGESTION_JOBS_MENU);
  I.see('Processing Status',CMS_PROCCESSING_STATUS_MENU);
  I.click(CMS_NEW_BUTTON);
  I.see('Upload','#menu_container_0 > md-menu-content > md-menu-item:nth-child(1) > button');
  I.see('Source', '#menu_container_0 > md-menu-content > md-menu-item:nth-child(2) > button');
  I.see('Ingestion Job', '#menu_container_0 > md-menu-content > md-menu-item:nth-child(3) > button');
  I.wait(5);
  I.amOnPage(STAGE_DISCOVERY_APP);
  I.wait(10)
  I.closeOtherTabs();
  I.wait(10)
});


Scenario('Switch to Collections application', I=>{
  I.wait(10);
  I.refreshPage();
  I.wait(10);
  I.click(APP_LIST_ON_RIGHT_PANEL);
  I.wait(2);
  I.click(RIGHT_PANEL_COLLECTIONS_SWITCH);   
  I.wait(5);
  I.amOnPage(STAGE_DISCOVERY_APP);
  I.wait(10)
  I.closeOtherTabs();
  I.wait(10)
})




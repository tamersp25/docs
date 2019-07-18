var RECURSION_LIMIT = 50;
var collapseNavElRecursion = 0;
var collapseExtendedFamilyRecursion = 0;

window.VERITONE_CONFIG = {
  apiRoot: '@@apiRoot@@'
};

function collapseChildren(el) {
  el = getSidebarNode(el);
  var subNavEls = getChildren(el);
  for (var i = 0; i < subNavEls.length; i++) {
    collapseNavEl($(subNavEls[i]));
  }
}

/**
 * Collapses all sidebar elements that are cousins (1st, 2nd, whatever) of the element
 **/
function collapseExtendedFamily(el) {
  el = getSidebarNode(el);
  collapseExtendedFamilyRecursion++;
  if (collapseExtendedFamilyRecursion > RECURSION_LIMIT) {
    console.error('collapseExtendedFamily recursion limit reached!');
    return;
  }
  var siblings = el.siblings();
  for (var i = 0; i < siblings.length; i++) {
    var sibling = $(siblings[i]);
    collapseNavElRecursion = 0;
    collapseNavEl(sibling);
  }
  var parentEl = el.parent().parent(); // li > ul > li
  if (!el.hasClass('sidebar-nav')) {
    collapseExtendedFamily(parentEl);
  }
  // TODO: It's currently recursing out of .sidebar-nav.  We should stop that once it gets to that point.
}

/**
 * Collapses the first level of the nav el that has links
 * Prevents us from collapsing a nav el that can't be expanded
 * @param el
 */
function collapseNavEl(el) {
  collapseNavElRecursion++;
  if (collapseNavElRecursion > RECURSION_LIMIT) {
    console.error('collapseNavEl recursion limit reached!');
    return;
  }
  if (el.children().length === 0) {
    // No children. Don't try to collapse.
  } else if (el.children()[0].tagName.toLowerCase() === 'a') {
    // Non-top-level link.  Collapse it.
    el.addClass('collapse');
  } else if (
    el.children()[0].tagName.toLowerCase() === 'p' &&
    $(el.children()[0]).children().length > 0 &&
    $(el.children()[0])
      .children()[0]
      .tagName.toLowerCase() === 'a'
  ) {
    // Top-level link.  Collapse it.
    el.addClass('collapse');
  } else if (el.find('ul a').length) {
    // It's not a link but there's one in its children somewhere.  Go find it.
    collapseChildren(el);
  }
}

/**
 * @todo: Kinda poorly assumes el.children[1] is ul
 **/
function getChildren(el) {
  return $(el.children()[1]).children();
}

/**
 * Returns the correct sidebar element to collapse based off of
 * The top level of the sidebar only sets .active on a child <p> so we need to go up to the
 * @param el
 */
function getSidebarNode(el) {
  if (el[0].tagName.toLowerCase() === 'p' && el.hasClass('active')) {
    return el.parent();
  }
  return el;
}

/**
 * Iterates over an object and calls the callback with the key and value
 * If the callback returns a truthy value, the iteration will be stopped
 * @param obj An object to iterate over
 * @param callback Callback function that accepts the key as the first parameter and the value as the second
 */
function iterateObject(obj, callback) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var stop = callback(key, obj[key]);
      if (stop) {
        break;
      }
    }
  }
}

window.$docsify = {
  basePath: '/docs',
  search: 'auto', // default
  maxLevel: 1,
  name:
    '<div><img src="https://static.veritone.com/assets/favicon/favicon.ico" height="18px" width="18px" style="margin-right: 5px"  alt="Veritone logo"/> Veritone Docs</div>',
  repo: '',
  // routerMode: 'history',
  subMaxLevel: 2,
  loadSidebar: true,
  auto2top: true,
  coverpage: true,
  // notFoundPage: {
  //   '\/(.*)(?<!\/)$': '1$/'
  // }

  /**
   * WARNING: Overridden Docsify behavior!
   *
   * Docsify uses aliases to dynamically use the content of one page to render on another URL.
   * This keeps the requested URL in the window location href but renders the content of another page.
   * This WORKS but it has problems with relative references, sidebar active page, and stuff.
   * Plus it keeps those legacy page URLs around and encourages their use.
   *
   * With our veritoneAliasRedirect plugin below, the alias is still used to resolve the page and load the markdown.
   * But then AFTER the page is resolved, our plugin runs and if it senses an alias was needed, it does a hard
   * reload to the alias destination.
   * This helps us encourage use of the canonical URLs and resolve relative assets and stuff nicely.
   */
  alias: {
    // Ensures there's only ever one single sidebar
    '/.*/_sidebar.md': '/_sidebar.md',

    // Permalinks for deprecated sections
    '^/apis/job-quick-start-guide.*$': '/apis/job-quickstart/',
    '^/apis/search-quick-start-guide.*$': '/apis/search-quickstart/',

    // Maintaining permalinks from old engines section
    '^/engines/classes$': '/developer/engines/cognitive/',
    // TODO: It'd be nice to port over some of the quick-start pages that still apply though.  All those screenshots and stuff...
    '^(/developer|)/engines/quick-start(.*)':
      '/developer/engines/getting-started/',
    '^/engines/types$': '/developer/engines/',
    '^/engines/guidelines/?$': '/developer/engines/',
    '^/engines/guidelines/cognitive-engines$': '/developer/engines/cognitive/',
    '^/engines/guidelines/real-time-engines$': '/developer/engines/cognitive/',
    // TODO: Adapters section might be out of date
    '^/engines/guidelines/adapters$': '/developer/adapters/guidelines',
    '^/engines/engine_standards/?$':
      '/developer/engines/standards/engine-output/',
    '^/engines/engine_standards/capability/?': '/developer/engines/cognitive/',
    '^/engines/engine_standards/veri_standards$':
      '/developer/engines/standards/engine-output/',
    '^/engines/manifest/?$': '/developer/engines/standards/engine-manifest/',
    '^/engines/custom-fields$': '/developer/engines/custom-fields/',
    '^/engines/testing-and-debugging$':
      '/developer/engines/testing-and-debugging/',
    '^/engines/engine-input-output/$': '/developer/engines/cognitive/',
    '^/engines/engine-input-output/transcription$':
      '/developer/engines/cognitive/speech/transcription/',
    '^/engines/engine-input-output/object-detection$':
      '/developer/engines/cognitive/vision/object-detection/',
    '^/engines/engine-input-output/face-detection$':
      '/developer/engines/cognitive/biometrics/face-detection/',
    '^/engines/faq$': '/developer/engines/faq/',

    // Permalinks to support legacy developer-only file structure
    '^/applications(|/.*)$': '/developer/applications$1',
    '^/data/(|/.*)$': '/developer/data$1',
    '^/engines(|/.*)$': '/developer/engines$1',
    '^/libraries(|/.*)$': '/developer/libraries$1',
    '^/veritone-developer-overview(|.md)$': '/developer/',
    '^/developer-benefits(|.md)$': '/developer/benefits',
    '^/terms-and-conditions(|.md)$': '/developer/terms-and-conditions',

    // Makes trailing slash optional for certain pages
    // TODO: change convention to use README files for all content pages (no my-page-name.md, only my-page-name/README.md)
    // and add a global alias (or maybe just a hard redirect in the plugin for converting no-trailing-slash to trailing-slash
    '^/architecture-overview(|.md)$': '/architecture-overview/',
    '^/glossary(|.md)': '/glossary/',
    '^/apis$': '/apis/',
    '^/apis/job-quickstart(|.md)$': '/apis/job-quickstart/',
    '^/apis/search-quickstart(|.md)$': '/apis/search-quickstart/',
    '^/apis/tutorials$': '/apis/tutorials/',
    '^/developer/applications$': '/developer/applications/',
    '^/developer/data$': '/developer/data/',
    '^/developer/engines$': '/developer/engines/',
    '^/developer/libraries$': '/developer/libraries/',
    '^/engines/engine-input-output$': '/engines/engine-input-output/',
    '^/engines/tutorials$': '/engines/tutorials/',
    '(.*)/quick-start$': '$1/quick-start/'
  },
  plugins: [
    /**
     * Sidebar Collapse
     * Makes all elements of the sidebar that aren't directly around the current node collapse
     * Leaves only the parent hierarchy leading to the current node and the first-level children of the current node expanded.
     **/
    function veritoneSidebarCollapsePlugin(hook) {
      hook.doneEach(function onPageChanged() {
        collapseExtendedFamilyRecursion = 0;
        var activeEl = $('.sidebar-nav .active');
        collapseChildren(activeEl);
        collapseExtendedFamily(activeEl);
      });
    },

    /**
     * Overrides Doscify "alias" behavior to also redirect whenever an alias was used to resolve a page
     * Does not apply to other assets like the sidebar alias (I think)
     **/
    function veritoneAliasRedirectPlugin(hook, vm) {
      hook.beforeEach(function onBeforePageParsed() {
        var redirects = vm.router.config.alias;
        iterateObject(redirects, function(routeMatch, newRoute) {
          var routeMatchRegex = new RegExp(routeMatch, 'g');
          var testResult = routeMatchRegex.exec(vm.route.path);
          if (testResult) {
            for (var i = 1; i < testResult.length; i++) {
              newRoute = newRoute.replace('$' + i, testResult[i]);
            }
            console.log(
              'Alias detected.  Redirecting from ' +
                vm.route.path +
                ' to ' +
                newRoute
            );
            window.location.replace(
              window.location.origin + window.location.pathname + '#' + newRoute
            );
            return true;
          }
        });
      });
    },

    /**
     * Adds a "Try It" link to any GraphQL samples
     **/
    function veritoneGraphqlLinkPlugin(hook) {
      hook.doneEach(function onPageChanged() {
        var examples = $('[data-lang="graphql"]');
        for (var i = 0; i < examples.length; i++) {
          try {
            createLinkFromExample(
              examples[i],
              'Try it in GraphiQL'
            ).insertAfter(examples[i]);
          } catch (e) {
            console.error(`Error adding GraphiQL link: ${e}`);
          }
        }
      });

      function createLinkFromExample(exampleNode, text) {
        var url = `${
          VERITONE_CONFIG.apiRoot
        }/v3/graphiql?query=${encodeURIComponent(exampleNode.innerText)}`;
        return $(`
              <p class="graphql-link">
                <a href="${url}" target="_blank">
                  <img src="_media/graphql.svg" height="16px" width="16px" alt="GraphQL icon">
                  ${text}
                </a>
              </p>`);
      }
    }
  ]
};
document.getElementById('new-issue-link').addEventListener('click', function() {
  window.open(
    'https://github.com/veritone/docs/issues/new?title=' +
      encodeURIComponent(
        'Issue on page: ' + (document.location.hash.slice(2) || 'Home')
      )
  );
});

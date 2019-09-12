Feature('schema hosting');

Scenario('graphql schemas are reachable', I => {
  I.amOnPage('/#/apis/schema/listing');
  I.click('schema.json');
  I.see('__schema');
});

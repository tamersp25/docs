Feature('schema hosting');

Scenario('graphql schemas are reachable', I => {
  I.amOnPage('/#/apis/schema/listing');
  I.click('schema.json');
  I.switchToNextTab();
  I.see('__schema');
});

Scenario('json-schemas are reachable and equal to their $id', async I => {
  // This schema's $id should not be changed and should be equal to the URL it's hosted on (in prod)
  const PRODUCTION_PATH_BASE = 'https://docs.veritone.com';

  const supportedValidationContracts = [
    'concept',
    'entity',
    'keyword',
    'language',
    'media-translated',
    'object',
    'sentiment',
    'summary',
    'text',
    'transcript'
  ];
  supportedValidationContracts.forEach(validationContract => {
    const schemaIdPath = `/schemas/vtn-standard/${validationContract}/${validationContract}.json`;

    I.amOnPage('/#/developer/engines/standards/engine-output/');
    I.closeOtherTabs();
    I.click(`${validationContract}.json`);
    I.switchToNextTab();
    I.seeCurrentUrlEquals(schemaIdPath);
    I.see(`"$id": "${PRODUCTION_PATH_BASE + schemaIdPath}"`);
  });
});

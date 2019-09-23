async function correlateTDO(tdo, channelName) {
  logger.info(`Correlating tdo ${tdo.id}`);
  const search = {
    index: ['mine'],
    limit: 30,
    offset: 0,
    query: {
      conditions: [
        { operator: 'term', field: 'channelName', value: channelName },
        { operator: 'range', field: 'endDateTime', gte: tdo.startDateTime },
        { operator: 'range', field: 'startDateTime', lte: tdo.stopDateTime }
      ],
      operator: 'and'
    },
    type: schemaId
  };
  const searchResult = await api.searchSDOs(search);
  if (searchResult.totalResults > searchResult.limit) {
    logger.warn(`Correlation truncated playout search results for tdo: ${tdo.id}`);
  }

  if (_.isEmpty(searchResult.results)) {
    logger.warn(`No sdos found for tdo: ${tdo.id}`);
    return null;
  }

  logger.info(`Found ${searchResult.results.length} sdos`);
  const [stationCallLetters, stationBand] = channelName.split('-');

  const spots = searchResult.results.map(event => {
    return Object.assign({}, event, {
      stationCallLetters,
      stationBand,
      eventId: event.id
    });
  });

  const series = generateSeries(tdo, spots);

  const fileData = {
    metadata: {
      schemaIds: [masterSchemaId],
      sourceEngineId: sourceEngineId
    },
    series,
    sourceEngineId: sourceEngineId,
    validationContracts: [masterSchemaId]
  };

  const asset = await api.createAsset(
    tdo.id,
    'vtn-standard',
    'application/json',
    fileData,
  );
  logger.info(`Created asset: ${JSON.stringify(asset)}`);
  await api.indexAsset(tdo.id, asset.id, null, false);
}

#!/bin/sh

SDIR=./src/docs/apis/schema/v3
mkdir -p $SDIR

echo "Generating schema.graphql..."
./node_modules/.bin/get-graphql-schema https://api.veritone.com/v3/graphql > $SDIR/schema.graphql
echo "Generating schema.json..."
./node_modules/.bin/get-graphql-schema https://api.veritone.com/v3/graphql -j > $SDIR/schema.json
echo "Generating schema files into $SDIR."

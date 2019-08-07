#!/bin/sh

BFILE=buildinfo.json
rm -f $BFILE


GITBRANCH=`git rev-parse --abbrev-ref HEAD`
GITCOMMIT=`git log -1 --format=%H`
GITDATE=`git log -1 --format=%cI`
GITCOMMITSHORT=`git log -1 --format=%h`
DATE=`date -u +%Y-%m-%dT%H:%M:%S-00:00`
DATESHORT=`date -u +%Y%m%d%H%M%S`
BUILDNUM="$DATESHORT-$GITCOMMITSHORT"

echo {\"commitHash\":\"$GITCOMMIT\", \"commitDate\":\"$GITDATE\", \"buildNumber\":\"$BUILDNUM\", \"buildDate\":\"$DATE\", \"branch\":\"$GITBRANCH\"} > $BFILE

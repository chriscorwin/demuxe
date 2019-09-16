#!/bin/bash

# make script able to read JSON
. ./config/ticktick.sh

# Grab current config info:
CONFIG=`cat ./config/config.json`

tickParse "$CONFIG"


FOLDER=./magick-flows-web-root/magick-flows/``id``
echo ""
echo "working with folder: $FOLDER"

if [ "$(ls -A $FOLDER/main-src/)" ]; then
	echo "SVG files need processed, clean them up now"

	# Clean up the svg files...

	# process with svgo
	echo ""
	echo "PASS FILES TO SVGO"
	echo "svgo --folder=$FOLDER/main-src/ --output=$FOLDER/main-svgo-processed/ --config=./config/svgo.config.json"
	svgo --folder=$FOLDER/main-src/ --output=$FOLDER/main-svgo-processed/ --config=./config/svgo.config.json

	# if "delete processed" flag set, delete the processed files

	# else move processed files to "processed folder"
	echo ""
	echo "mkdir -p $FOLDER/main-src-originals"
	mkdir -p $FOLDER/main-src-originals
	echo ""
	echo "mv -fv $FOLDER/main-src/* $FOLDER/main-src-originals/"
	mv $FOLDER/main-src/* $FOLDER/main-src-originals/

	# adjust line heights
	echo ""
	echo "ADJUST LINE HEIGHTS"


	# move files after adjusting line heights
	echo ""
	echo "mkdir -p $FOLDER/main-line-height-adjust"
	mkdir -p $FOLDER/main-line-height-adjust
	echo ""
	echo "mv -f $FOLDER/main-svgo-processed/* $FOLDER/main-line-height-adjust/"
	mv $FOLDER/main-svgo-processed/* $FOLDER/main-line-height-adjust/

	# pretty print
	echo ""
	echo "PRETTY PRINT"

	# move files after pretty printing
	echo ""
	echo "mkdir -p $FOLDER/main"
	mkdir -p $FOLDER/main
	echo ""
	echo "mv -f $FOLDER/main-line-height-adjust/* $FOLDER/main/"
	mv $FOLDER/main-line-height-adjust/* $FOLDER/main/
else
	echo "No SVG files need processed, continue with startup"
fi





rm config/config.json
cp config/demos/config.$1.$2.$3.json config/config.json


# quick copy/paste to set your config:
# npm run set-config catalogue poc19 demuxe
# npm run set-config audience-studio cnx19keynote fever
# npm run set-config audience-360 cnx19keynote fever
# npm run set-config is cnx19keynote michael-page
# npm run set-config audience-360 cnx19keynote pacers
# npm run set-config is basecamp19 msm


# eventually this should totally be a menu that let's you select this stuff. Maybe even on startup...
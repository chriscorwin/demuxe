# To use:
# 
# Create a config file like: <demuxe root directory>/config/demos/config.${productTemplate}.${demoVenue}.${brandTheme}.json
# 
# eg:
# <demuxe root directory>/config/demos/config.



# You set the config for THIS INSTANCE OF DEMUXE by running a terminal command like:
# 
# `npm run set-config dashboard magick-flows-starter-kit demuxe`
# 
# Profit!




# Backs the previous config up.
cp config/config.json config/config.json.bak

# Removes the previus config file, so we can replace it with the new one.
rm config/config.json

# Copies the config file you created into the config directory.
cp config/demos/config.$1.$2.$3.json config/config.json



# Handy copy/paste ideas to set config for existing things!
# 
# Simply copy the line (minus the hash prefix and run the command in your terminal.)
# 
# npm run set-config catalogue poc19 demuxe
# npm run set-config audience-studio cnx19keynote fever
# npm run set-config audience-360 cnx19keynote fever
# npm run set-config is cnx19keynote michael-page
# npm run set-config audience-360 cnx19keynote pacers
# npm run set-config is basecamp19 msm









# eventually this should totally be a menu that let's you select this stuff. Maybe even on startup...
# 
# No time now, but when it happens, this is how it can happen:

# MENU_HL=${X}
# MENU_HEADER=${X}
# MENU_INDEX=${X}
# MENU_OPTION=${X}
# MENU_PROMPT=${X}${MENU_HEADER}

#  #[ -n "$MENU_HL"     ] || export MENU_HL=${X}${COL_BLUE}
#  #[ -n "$MENU_HEADER" ] || export MENU_HEADER=${X}${COL_BLUE}
#  #[ -n "$MENU_INDEX"  ] || export MENU_INDEX=${X}${B}${COL_YELLOW}
#  #[ -n "$MENU_OPTION" ] || export MENU_OPTION=${X}${COL_CYAN}
#  #[ -n "$MENU_PROMPT" ] || export MENU_PROMPT=${X}${B}${COL_YELLOW}

# function __menu {
#     declare -a items extraItems ndxes vals
#     local i j k index item opt optndx pair prompt msg parsedItem bar
#     local hr="${MENU_HL}  ------------------------------------------------  ${X}"

#     [ $# == 0 ] && return 1

#     # purposely not using __in_args due to complexity of args
#     if egrep -q "^--prompt=" <<< "$1"; then
#         prompt=$( awk '{ print substr($0,10); }' <<< "$1" )
#         shift
#     fi

#     egrep -q ' -k :' <<< "$@" && k=true
#     if [ $k ]; then
#         until [ "$1" == "-k" ]; do
#             items[${#items[@]}]="$1"
#             shift
#         done
#         shift
#         until [ $# == 0 ]; do
#             extraItems[${#extraItems[@]}]="$1"
#             shift
#         done

#     else
#         until [ $# == 0 ]; do
#             items[${#items[@]}]="$1"
#             shift
#         done
#     fi

#     if [ ${#items[@]} -eq 0 ] && [ ${#extraItems[@]} -eq 0 ]; then
#         # __debug "__menu: No lists given. Given: $@"
#         echo
#         echo ${E}"  __menu did not detect any list items to display. Aborting...  "${X}
#         return 2
#     fi

#     # reset output variables
#     _menu_sel_index=
#     _menu_sel_value=

#     # check for custom message
#     msg="Please make a selection"
#     [ -n "$prompt" ] && msg="$prompt"

#     # build menu
#     echo ${MENU_HL}${X}
#     echo ${MENU_HEADER}"  ${msg} (or press Enter to abort):  "${X}
#     echo ${MENU_HL}${X}

#     if [ ${#items[@]} -gt 0 ]; then
#         for (( i = 1; i <= ${#items[@]}; i++ )); do
#             j=$(( i - 1 ))
#             item="${items[$j]}"
#             # (( i % 2 == 0 )) && bar=" " || bar="${X}${D}|${X}"
#             bar=" "

#             # make indexes right-aligned. works for up to 999 choices.
#             if (( i < 10 )); then
#                 index="  $i"
#             elif (( i < 100 )); then
#                 index=" $i"
#             else
#                 index="$i"
#             fi
#             echo " ${bar}${MENU_INDEX}${index}:${X}  ${MENU_OPTION}${item}${X}"
#         done
#     fi

#     # If extra list is given, parse
#     if [ ${#extraItems[@]} -gt 0 ]; then
#         echo "$hr"
#         i=0
#         for pair in "${extraItems[@]}"; do
#             bar=" "
#             # (( i % 2 == 0 )) && bar="${X}${D}|${X}" || bar=" "

#             parsedItem="${pair:1}"
#             parsedItem="${parsedItem/:/ }"
#             ndxes[$i]="${parsedItem%% *}"
#             vals[$i]="${parsedItem#* }"

#             # printf fails if colors inserted. make the output echo separately.
#             echo -n " ${bar}${MENU_INDEX}"; printf "%3s:" "${ndxes[$i]}"; echo "  ${MENU_OPTION}${vals[$i]}${X}"
#             (( i++ ))
#         done
#     fi

#     echo
#     echo -n ${MENU_PROMPT}"  ${msg} (or press Enter to abort):  "${X}
#     read opt

#     # validate response
#     if [ -n "$opt" ]; then
#         _menu_sel_index="$opt"

#         if [ ${#extraItems[@]} -gt 0 ] && __in_array "$opt" "${ndxes[@]}"; then
#             _menu_sel_value="${vals[${_in_array_index}]}"

#         # elif egrep -q '^[[:digit:]]+$' <<< "$opt" && [ $opt -gt 0 ]; then
#         elif egrep -q '^[0-9]+$' <<< "$opt" && [ $opt -gt 0 ]; then
#             (( optndx = opt - 1 ))

#             if [ -n "${items[${optndx}]}" ]; then
#                 _menu_sel_value="${items[${optndx}]}"
#             else
#                 # invalid selection. no *numeric* key matches what user typed in.
#                 return 4
#             fi

#         else
#             # invalid selection. no key matches what user typed in.
#             return 4
#         fi

#         echo
#         echo "  You chose: ${MENU_INDEX}${_menu_sel_index}${X}"
#     else
#         echo
#         echo "  You chose to abort."
#     fi

#     #wrap up...
#     export _menu_sel_index
#     export _menu_sel_value

#     return 0
# }
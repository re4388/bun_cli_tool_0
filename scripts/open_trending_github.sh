#!/bin/bash

langList=(
   'typescript'
   'javascript'
   'Python'
   'All'
   'shell'
   'go'
   'c'
   'java'
 )

# Use fzf to select an element
# langList[@] is shell way to get all ele from a list
selected_item=$(printf "%s\n" "${langList[@]}" | fzf)

# Check if an item was selected
if [[ -n "$selected_item" ]]; then
  # Do something with the selected item
  echo "You selected: $selected_item"
else
  echo "No item selected."
fi

open -na "Google Chrome" --args --profile-directory="Profile 12" --new-window https://github.com/trending/"${selected_item}"\?since=weekly
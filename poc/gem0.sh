#!/bin/bash

# https://github.com/charmbracelet/gum


#gum choose "a1" "a2"


#gum input --placeholder "scope"

#multi-line
#gum write --placeholder "Details of this change (CTRL+D to finish)"


#gum confirm "Commit changes?" && git commit -m "$SUMMARY" -m "$DESCRIPTION"

#TYPE=$(gum choose "fix" "feat" "docs" "style" "refactor" "test" "chore" "revert")
#SCOPE=$(gum input --placeholder "scope")
#
## Since the scope is optional, wrap it in parentheses if it has a value.
#test -n "$SCOPE" && SCOPE="($SCOPE)"
#
## Pre-populate the input with the type(scope): so that the user may change it
#SUMMARY=$(gum input --value "$TYPE$SCOPE: " --placeholder "Summary of this change")
#DESCRIPTION=$(gum write --placeholder "Details of this change (CTRL+D to finish)")
#
## Commit these changes
#gum confirm "Commit changes?" && git commit -m "$SUMMARY" -m "$DESCRIPTION"




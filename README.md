# kayo-reddit-extension
When watching AFL games on Kayo it will automatically add a Twitch chat style sidebar. On full screen it will display the best comments on a ticker at the bottom of the screen,

## Instructions

Modify the config variable in the src/content.ts to false to turn off development mode

Use the command 'npm run build'
In Firefox, go to about:debugging
Add a private extension
Select the manifest.json file
It will now automatically work with Kayo

## Bugs

News Ticker isn't displaying comments properly
Match thread sometimes gets confused, doesn't seem to be matching Kayo url with Reddit thread titles, needs a quick check

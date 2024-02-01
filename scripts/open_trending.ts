import { runAppleScript } from 'run-applescript'

const script = `
tell application "Google Chrome"
activate
-- Open a new window
make new window

-- Open tabs in the new window
tell window 1
set URL of active tab to "https://github.com/trending"
  tell application "System Events" to keystroke "t" using {command down}
    set URL of active tab to "https://github.com/trending?l=Python"
      tell application "System Events" to keystroke "t" using {command down}
    set URL of active tab to "https://github.com/trending?l=JavaScript"
      tell application "System Events" to keystroke "t" using {command down}
      set URL of active tab to "https://github.com/trending?l=TypeScript"
    tell application "System Events" to keystroke "t" using {command down}
      set URL of active tab to "https://github.com/trending"
  end tell
end tell
`

await runAppleScript(script)

import { runAppleScript } from 'run-applescript'

export async function openInIterm2(cmd: string) {
    await runAppleScript(`
set commandToRun to "${cmd}"

if application "iTerm" is running then
    tell application "iTerm"
        activate
        try
            set currentWindow to first window
        on error
            set currentWindow to (create window with default profile)
        end try
        tell current session of currentWindow
            write text commandToRun
        end tell
    end tell
else
    tell application "iTerm"
        activate
        set newWindow to (create window with default profile)
        tell current session of newWindow
            write text commandToRun
        end tell
    end tell
end if

`)
}

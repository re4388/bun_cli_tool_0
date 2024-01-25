// from Kit
import { runAppleScript } from 'run-applescript'

export async function focusTab(url: string, browser = 'Google Chrome') {
    return await runAppleScript(String.raw`
set address to "${url}"

tell application "${browser}"
    activate
        if not (exists window 1) then reopen
        repeat with w in windows
                set i to 1
                repeat with t in tabs of w
                if URL of t contains address then
                        set active tab index of w to i
                        set index of w to 1
                        return address
                end if
                set i to i + 1
                end repeat
        end repeat
        
        if address does not start with "http" then
          set address to "https://" & address
        end if
        
        open location address
        return address
end tell
`)
}

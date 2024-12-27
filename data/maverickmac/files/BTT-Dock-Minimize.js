(async()=>{
    AS=s=>(runAppleScript(s))
    PA=n=>{trigger_action({json:JSON.stringify({BTTPredefinedActionType:n})})}

    a=await get_string_variable("hovered_element_details")
    v=i=>(a.split('AX'+i+':  "')[1].split('"')[0])

    F=v('Subrole').slice(2,4)
	console.log("Hello world!")
    
    // Extract the application name from the URL
    let appName = decodeURIComponent(v('URL')).slice(7,-1).split('/').pop().split('.')[0]

    if(F=="Ap" && (v('IsApplicationRunning')*1)){
        // Use AppleScript to handle the logic for minimizing/unminimizing
        await AS(`
				set appName to "${appName}"
				set isMinimized to false
				set multiWindows to false
				
				if application appName is running then
					tell application "System Events" to tell process appName
						set windowCount to count of windows
						if windowCount is 0 then
							set cmdStr to "open -a " & appName
							do shell script cmdStr
							
						else if windowCount is 1 then
							set theWindow to first window
							set isMinimized to value of attribute "AXMinimized" of theWindow
							if isMinimized then
								-- Unminimize the window
								set value of attribute "AXMinimized" of theWindow to false
							else
								-- Minimize the window
								if not frontmost then set frontmost to true
								set value of attribute "AXMinimized" of theWindow to true
							end if
						else if windowCount ≥ 2 then
							set frontmost to true
							delay 0.1
							key code 125 using {control down}
						end if
					end tell
				else
					tell application "System Events" to click UI element appName of list 1 of application process "Dock"
					activate
				end if
        `);
    } else if(F=="Sp"||F=="Tr"||F=="Se"||F==""){
        AS(`beep`)
    }

    returnToBTT(f);
})();
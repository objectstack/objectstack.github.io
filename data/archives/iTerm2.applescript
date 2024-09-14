tell application "iTerm"
	activate
	delay 1
	tell current window
		set myNewTab to create tab with default profile
		tell current session of myNewTab to write text "pwd"
		#create tab with default profile
		#create tab with default profile
	end tell
end tell

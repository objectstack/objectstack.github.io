tell application "System Events"
	
	#set visible of (every process whose visible is true) to false
	#set visible of every process "Finder" to false
	set visibleApps to every process whose visible is true and name is not "Finder"
	set appCount to count of visibleApps
	log appCount
	tell application "Finder"
		set countWindows to count of windows
	end tell
	log countWindows
end tell
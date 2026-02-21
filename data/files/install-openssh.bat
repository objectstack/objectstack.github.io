@echo off
REM ================================================
REM Install OpenSSH Client and create .ssh folder
REM Windows 11 Batch Script
REM ================================================

echo.
echo Creating .ssh directory under user profile...

if not exist "%USERPROFILE%\.ssh" (
    mkdir "%USERPROFILE%\.ssh"
    echo Created: %USERPROFILE%\.ssh
) else (
    echo .ssh directory already exists
)

echo.
echo Installing OpenSSH Client...

REM Check if already installed
powershell -Command "Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Client*' | findstr Installed" >nul

if %errorlevel%==0 (
    echo OpenSSH Client already installed
) else (
    powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0"
)

echo.
echo Verifying installation...

where ssh >nul 2>nul

if %errorlevel%==0 (
    echo OpenSSH installed successfully
) else (
    echo OpenSSH installation failed or restart required
)

echo.
echo Done.
pause
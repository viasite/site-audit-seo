@echo off
:: Use environment variable for INSTALL_DIR if it exists, else use default
IF NOT DEFINED INSTALL_DIR SET "INSTALL_DIR=%LocalAppData%\Programs\site-audit-seo"
echo INSTALL_DIR: %INSTALL_DIR%

:: Check if the install directory exists, create if it does not
IF NOT EXIST "%INSTALL_DIR%" (
    mkdir "%INSTALL_DIR%"
)

:: Clone the repository (Ensure you have git command available)
pushd "%INSTALL_DIR%"
IF EXIST ".git" (
    echo Repository already cloned, updating...
    git pull
) ELSE (
    git clone https://github.com/viasite/site-audit-seo.git "%INSTALL_DIR%"
)

:: Assuming docker-compose.yml is at the root of the cloned directory
:: Start Docker Compose
docker compose pull
docker compose up -d

:: Follow the logs
docker compose logs -tf

popd

echo.
echo site-audit-seo will remain running in the background.
echo To stop the service, run:
echo cd "%INSTALL_DIR%"
echo docker compose down

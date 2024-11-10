@echo off
REM Start Zookeeper
start cmd /k "cd C:\kafka_2.13-3.8.0\bin\windows && zookeeper-server-start.bat C:\kafka_2.13-3.8.0\config\zookeeper.properties"

REM Start Kafka Server
start cmd /k "cd C:\kafka_2.13-3.8.0\bin\windows && kafka-server-start.bat C:\kafka_2.13-3.8.0\config\server.properties"

REM Start Backend Server (Node.js)
start cmd /k "cd backend && node app.js"

REM Start Frontend Server (React)
start cmd /k "cd video-management-frontend && npm start"

echo All processes started. Press any key to exit.
pause

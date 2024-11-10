@echo off
REM Save the current directory
set ORIGINAL_PATH=%cd%

REM Navigate to Kafka directory
cd /d C:\kafka_2.13-3.8.0

REM Start Zookeeper
start cmd /k "bin\windows\zookeeper-server-start.bat config\zookeeper.properties"

REM Wait for Zookeeper to start
timeout /t 5

REM Start Kafka server
start cmd /k "bin\windows\kafka-server-start.bat config\server.properties"

REM Wait for Kafka server to start
timeout /t 5

REM Check if the topic 'video-uploads' already exists
for /f %%i in ('bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092') do (
    if "%%i"=="video-uploads" (
        echo Topic 'video-uploads' already exists.
        goto end
    )
)

REM Create Kafka topic if it doesn't exist
echo Creating topic 'video-uploads'...
bin\windows\kafka-topics.bat --create --topic video-uploads --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1

REM List Kafka topics to verify creation
bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092

:end
REM Return to the original directory
cd /d %ORIGINAL_PATH%
echo Script completed, returned to %ORIGINAL_PATH%

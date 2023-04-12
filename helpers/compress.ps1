mkdir tmp
cp * -Exclude .\node_modules,tmp,.git -Destination .\tmp\
Compress-Archive tmp\* -DestinationPath .\bot.zip -Force
rm -Recurse -Force tmp 
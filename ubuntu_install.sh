sudo apt-get install imagemagick graphicsmagick ruby rubygems nodejs nodejs-legacy npm build-essential
gem install scss_lint rake
npm install
sudo npm install bower gulp-cli grunt -g
bower install --allow-root
cd bower_components/modernizr
./bin/modernizr -c ../../configs/modernizr.json
cd ../..
gulp production-build
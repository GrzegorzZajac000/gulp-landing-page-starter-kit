Gulp-landing-page-starter-kit is my starter kit which I develop for my own usage. It contains:
 - Image and code minification and compression
 - Auto generating many favicons
 - Autoprefixer for SCSS & autopolyfiller for JS
 - SCSS & JS Linters
 - HTML includes
 - Components file structure
 - IE support
 - Sourcemaps generating
 - PNG & SVG Sprites generating
 - BrowserSync (for serve project)
 - Support for SSL (HTTPS)
 - Support for print media
 - Support for Bower packages and files from vendor folder
 - Support for manifest.json
 - jQuery, Modernizr & Bootstrap v3
 
 **The project is no longer being developed**

----------

## Installation
```
git clone https://github.com/GrzegorzZajac000/gulp-landing-page-starter-kit.git
cd gulp-landing-page-starter-kit
```

## Init project for development
OSX:
```
$ sh osx_install.sh
```
Ubuntu:
```
$ sh ubuntu_install.sh
```

## Run project
Development:
```
    $ gulp
```
Production:
```
    $ gulp serve-production
```
## Available functions
Gulp functions:
 - `gulp copy-files-to-dist`
 - `gulp favicon` (alias for `gulp grunt-favicon`)
 - `gulp webfont-copy`
 - `gulp webfont-bower-copy`
 - `gulp clean`
 - `gulp html-include-development`
 - `gulp html-include-development-newer`
 - `gulp html-include-production`
 - `gulp image-compression`
 - `gulp copy-svg-sprite`
 - `gulp image-copy-newer`
 - `gulp javascript-development`
 - `gulp javascript-production`
 - `gulp serve`
 - `gulp serve-production`
 - `gulp generating-2x-sprites-icon`
 - `gulp generating-2x-sprites-icon-newer`
 - `gulp generating-sprites`
 - `gulp generating-svg-sprites`
 - `gulp critical-css-development`
 - `gulp critical-css-production`
 - `gulp generate-critical-css-development-inject`
 - `gulp generate-critical-css-production-inject`
 - `gulp scss-lint`
 - `gulp scss-development`
 - `gulp scss-production`
 - `gulp watch`
 - `gulp watch-production`
 - `gulp bower-dev`
 - `gulp bower-dev-clean`
 - `gulp development-build`
 - `gulp production-build`

Gulp-grunt functions:
 - `gulp grunt-favicons`
 - `gulp grunt-fontface`
 - `gulp grunt-favicon`
 - `gulp grunt-fontgen`
    
## Known bugs

 - No placeholder for unloaded images and figure element
 - No Windows install script
 - Critical CSS doesn't work
 - Watch on `bower_components` doesn't work
 - Doesn't generate sprites for retina displays

**Feel free to improve the code**
-----------------------------

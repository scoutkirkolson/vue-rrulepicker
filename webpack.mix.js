let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.options({
    processCssUrls: true
    , imgLoaderOptions: {
        enabled: false
    }
});

mix.js('src/sko-rrulepicker-calendarpanel.vue', 'dist/js');
mix.js('src/sko-rrulepicker.vue', 'dist/js');

//mix.version();

//mix.browserSync({
//  proxy: 'http://asap'
//  , port: 3020
//});
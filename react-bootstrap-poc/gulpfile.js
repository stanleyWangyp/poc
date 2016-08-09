var gulp = require('gulp');
var browserify = require('browserify');//
var watchify = require('watchify');
//让文件每次变动都编译呢  watchify是一个browserify的封装，其在packages.json中的配置与browserify完全一样，且无需改变"browserify"字段名直接执行watchify x.js -o x.out.js即可
var source = require("vinyl-source-stream");
var babel = require('gulp-babel');
var concatCss = require('gulp-concat-css');
var cssmin = require('gulp-cssmin'); //压缩css文件
var del = require('del');  //gulp plugins 删除文件或文件夹
var shell = require('gulp-shell');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
// webpack config to build and serve examples
var exampleConfig = require('./webpack.example.config');
// webpack config to build umd bundle
var umdConfig = require('./webpack.umd.config');


//sass的编译                  （gulp-ruby-sass）
//自动添加css前缀              （gulp-autoprefixer）
//压缩css                    （gulp-minify-css）
//js代码校验                  （gulp-jshint）
//合并js文件                  （gulp-concat）
//压缩js代码                  （gulp-uglify）
//压缩图片                    （gulp-imagemin）
//自动刷新页面                 （gulp-livereload）
//图片缓存，只有图片替换了才压缩  （gulp-cache）
//更改提醒                    （gulp-notify）
//清除文件                    （del）

var watching = false;
var demo = false;

//gulp default task ，默认gulp方法 直接敲击gulp则会执行该方法
gulp.task('default', ['prod']);

//del 文件或文件夹 
gulp.task('clean', function() {
  return del([
    './dist/*',
    './lib/**'
  ]);
});

//------------
// PROD
// -----------
gulp.task('prod', ['umdBuild'], function() {
  // - Use gulp-babel to transpile each file for ppl who use webpack/browserify
  // - This will be the package.json entry point
  // - Most of the ppl will use this, and should use their own source maps when bundling,
  // as well as uglify in production.
  // - This is the way React itself distributes their package,
  // as well as other libraries like react-boostrap
  
  //可以选择babel一个将ES6/ES7写的代码转换为ES5代码的编译器. 我们选择使用gulp自动化编译生成es5代码.
  gulp.src(['./src/**/*.js', './src/*js'])
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
  // build the css
  gulp.src('./css/react-bootstrap-table.css')
    .pipe(concatCss("./react-bootstrap-table.min.css"))
    .pipe(cssmin())
    .pipe(gulp.dest('./css'));
  gulp.src(['./css/react-bootstrap-table.css', './css/toastr.css'])
    .pipe(concatCss('./react-bootstrap-table-all.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('./css'));
});

//umd js规范和写法
// build umd bundles for https://npmcdn.com/ and for browser <script> tag
gulp.task('umdBuild', ['clean'], shell.task([
  'webpack --config webpack.umd.config.js',
  'webpack --config webpack.umd.min.config.js'
]));

//------------
// EXAMPLES
// -----------
gulp.task('example-server', function() {

  new WebpackDevServer(webpack(exampleConfig), {
    publicPath: exampleConfig.serverConfig.publicPath,
    contentBase: exampleConfig.serverConfig.contentBase,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      assets: true,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false
    },
    historyApiFallback: true
  }).listen(exampleConfig.serverConfig.port, 'localhost', function(err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3004');
  });

});

// TODO: consider dropping browserify and just use webpack
//------------
// DEMO
// -----------
gulp.task("dev", function() {
  watching = true;
  buildDemoCode();
});

function buildDemoCode() {
  demo = true;
  browserifing("./demo/js/demo.js", "demo.bundle.js", "./demo/js");
}

//bundle  browserify 方法 把多个文件打包成一个文件
function browserifing(main, bundleName, dest) {
  var b = browserify({
    entries: [main],
    transform: ["babelify"],
    cache: {},
    debug: true,
    packageCache: {},
    fullPaths: true,
  });

  if (demo)
    b = b.require(require.resolve('./src/index.js'), {
      expose: 'react-bootstrap-table'
    });

  if (watching) {
    b = watchify(b);
    b.on('update', function() {
      bundle(b, bundleName, dest);
    });
  }
  bundle(b, bundleName, dest);
}

function bundle(b, bundleName, dest) {
  b.bundle()
    .on('error', function(err) {
      console.log(err.message);
    })
    .on('end', function() {
      console.log("building success.");
    })
    .pipe(source(bundleName))
    .pipe(gulp.dest(dest));
}

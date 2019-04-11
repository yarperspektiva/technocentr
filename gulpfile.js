// 09-02-2019 Добавил { usePolling: true } т.к. слишком долго генерировался проект
// https://gitlab.cs.washington.edu/glassctm/CShark/tree/55346ca6b16c6bbdadb94701dd554f26b17a3633/node_modules/chokidar
// https://github.com/BrowserSync/browser-sync/issues/1065


// http://www.codeblocq.com/2015/11/Refresh-webpages-automatically-during-development-using-Gulp/
// 'use strict';
// plugins init

const gulp         = require('gulp'),
	  runSequence  = require('run-sequence'),
	  sass         = require('gulp-sass'),
	  postcss      = require('gulp-postcss'),
	  sourcemaps   = require('gulp-sourcemaps'),
	  autoprefixer = require('autoprefixer'),
	  csso         = require('postcss-csso'),
	  uglify       = require('gulp-uglify'),
	  // strip = require('gulp-strip-comments'), // Удаляем комменты - console.log т.д.

	  del          = require('del'),
	  notify       = require('gulp-notify'),
	  fileinclude  = require('gulp-file-include'), // https://www.npmjs.com/package/gulp-file-include
	  mqpacker     = require('css-mqpacker'),
	  prettyHtml   = require('gulp-pretty-html'), // https://www.npmjs.com/package/gulp-pretty-html

	  // sortMediaqueries = require('css-mqpacker-sort-mediaqueries'),

	  browserSync  = require('browser-sync').create(),
	  gutil = require('gulp-util'),
	  plumber = require('gulp-plumber'),
	  concat = require('gulp-concat'),
	  sassGlob = require('gulp-sass-glob'),	//https://www.npmjs.com/package/gulp-sass-glob
	  										//gulp-sass-glob - позволяет использовать import в css на несколько разделов ../../../ выше
	  gulpif = require('gulp-if'),
	  path = require('path'),
	  watch = require('gulp-chokidar')(gulp);
	  // changed = require('gulp-changed');

	  //newer = require('gulp-newer');

// workspace

const srcPath  = 'development',
	  destPath = 'production',
	  final    = true;

// config
const config = {
	src: {
		root:     srcPath,
		css:      srcPath + '/css',
		sass:     srcPath + '/scss',
		html:     srcPath + '/html',

		jsCore:    srcPath + '/js',
		modules:   srcPath + '/modules',

		fonts:    srcPath + '/fonts',
		images:   srcPath + '/images',
		temp:     srcPath + '/temp'
	},

	dest: {
		root:   destPath,
		css:    destPath + '/css',
		sass:   destPath + '/css',
		html:   destPath,
		js:     destPath + '/js',
		fonts:  destPath + '/fonts',
		images: destPath + '/images',
		temp:   destPath + '/temp'
	}
}

const plugins = [
	autoprefixer({
		// browsers: ['last 2 versions'],
		browsers: [
			'>0.2%',
		    // 'not dead',
		    'not ie < 11',
		    'not op_mini all',
		    'ie 11',
		    'ie 10'
		],

		cascade: false
	}),
    mqpacker({
        sort: sortMediaQueries
		// sort: true
    }),
	csso({
		comments: false
	})
];

gulp.task('clean', function() {
	return del(config.dest.root);
});



gulp.task('sass', function() {
	return gulp.src([
		config.src.sass + '/*.{sass,scss,css}'
	])
	.pipe(sassGlob())
	.pipe( gulpif(!final, sourcemaps.init() ) )

	// .pipe( sourcemaps.init() )
	// .pipe(gulpIgnore.exclude(conditionScss))
	.pipe(sass({
		includePaths: [config.src.root]
	}))
	.on('error', notify.onError(function(err) {
		return {
			title: 'Sass',
			message: err.message
		}
	}))
	.pipe( gulpif(final, postcss(plugins)  ) )
	.pipe( gulpif(!final,  sourcemaps.write('.', {includeContent: false})    ) )

	// .pipe( sourcemaps.write('.', {includeContent: false})  )
	.pipe( gulp.dest(config.dest.sass) )
});

gulp.task('html', function() {
	return gulp.src([
		config.src.html + '/*.html'
		// ,config.src.modules + '/**/*.html'
	])
	// .pipe(newer(config.dest.html))

	.pipe(fileinclude({
		prefix: '@@',
        basepath: config.src.root + '/modules'
	}))
	.on('error', notify.onError(function(err) {
		return {
			title: 'HTML Include',
			message: err.message
		}
	}))



	// .pipe(changed('app', {hasChanged: changed.compareContents}))
	.pipe( gulpif(final, prettyHtml({
		indent_size: 4,
	    indent_char: ' ',
	    unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br', 'style']
	})  ) )
	.pipe(gulp.dest(config.dest.html));
});

gulp.task('js', function() {

	var onError = function(err) {
        notify.onError({
                    title:    "Gulp",
                    subtitle: "Failure!",
                    message:  "Error: <%= error.message %>",
                    sound:    "Beep"
                })(err);

        this.emit('end');
    };


	return gulp
		.src([
			config.src.jsCore + '/**/[^_]*.js' // Исключаем файлы начинающие на _
		])
		.pipe(gulpif(!final,  sourcemaps.init({loadMaps: true, largeFile: true}) ))
		.pipe(fileinclude())

		// .pipe(concat('general.js'))
		.pipe(plumber({errorHandler: onError}))

		.on('error', notify.onError(function(err) {
			return {
				title: 'JS Include',
				message: err.message
			}
		}))

		.pipe( gulpif(final, uglify(
			{
				compress: {
					drop_console: true,
			        global_defs: {
			            // "DEBUG": true
						"@alert": "console.log"
			        }
			    }
			}
		) ) )
		.on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
		// .pipe( gulpif(!final, sourcemaps.write('.', {includeContent: false})   ) )
		.pipe(gulp.dest(config.dest.js));
});
gulp.task('copy:fonts', function() {
	return gulp
		// .src(config.src.fonts + '/**/*.{ttf,otf,woff,woff2,svg}')
		.src(config.src.fonts + '/**/*')
		.pipe(gulp.dest(config.dest.fonts));
});


gulp.task('copy:images', function() {
	return gulp
		.src(config.src.images + '/**/*.{jpg,jpeg,png,gif,svg,ico}')
		.pipe(gulp.dest(config.dest.images));
});

gulp.task('copy:temp', function() {
	return gulp
		.src(config.src.temp + '/**/*{jpg,jpeg,png,gif,svg,ico,html,mp4}')
		.pipe(gulp.dest(config.dest.temp));
});
gulp.task('copy:css', function () {
	return gulp.src([
		config.src.css + '/*.css'
	])
	.pipe( gulp.dest(config.dest.css) )
});


gulp.task('watch', function() {
	watch(config.src.root  + '/**/*.{sass,scss}', 'sass'), { usePolling: true };
	watch(config.src.root  + '/**/*.html', 'html'), { usePolling: true };
	watch(config.src.root  + '/**/*.js', 'js'), { usePolling: true };

	watch(config.src.images  + '/**/*.{jpg,jpeg,png,gif,svg,ico}', 'copy:images', { usePolling: true });
	watch(config.src.temp  + '/**/*.{jpg,jpeg,png,gif,svg,ico,html,mp4}', 'copy:temp'), { usePolling: true };
	watch(config.src.css  + '/**/*.{css}', 'copy:css'), { usePolling: true };
});

// sync
gulp.task('server', function() {
	browserSync.init({
		server: config.dest.root,
		reloadDelay: 200,
		// server: {
		// 	baseDir: "./"
		// },
		// port: 8080,
		// open: true,
		// browser: ["google chrome", "firefox"]
		notify: false
	});

	browserSync.watch(config.src.root + '/**/*').on('change', browserSync.reload);
});

gulp.task('default', function() {
	runSequence(
		['clean'],
		['sass', 'html', 'js',  'copy:fonts', 'copy:images', 'copy:temp', 'copy:css'],
		['watch', 'server']
	);
});



function isMax(mq) {
    return /max-width/.test(mq);
}
function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename'),
    moment      = require('moment'),
    notify      = require('gulp-notify'),
    sass        = require('gulp-sass'),
    template    = require('gulp-template-html');
    
var defaultTasks = [
	//'before-js',
	'after-js',
	'sass',
	'html-build-public',
	//'html-build-auth'
];

require('gulp-help')(gulp, {
    description: 'Help listing.'
});

gulp.task('before-js', 'Concat, Uglify JavaScript into a single JS for the HEAD.', function() {
    gulp.src([
    		'resources/lib/theme-public/js/vendor/html5shiv.min.js',
    		'resources/lib/theme-public/js/vendor/respond.min.js',
    	])
        .pipe(concat('unboxanodeblog'))
        .pipe(uglify())
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(rename({
            extname: '.ie9.min.js'
         }))
        .pipe(gulp.dest('resources/script/min'))
        .pipe(notify('JS IE ( ' + moment().format('h:mm:ss') + ' )'));
	gulp.src([
	    	'resources/lib/theme-public/js/vendor/jquery.min.js',
			//'resources/lib/bootstrap-4.1.1/js/src/jquery-migrate-3.0.0.min.js', 
		])
	    .pipe(concat('unboxanodeblog'))
	    .pipe(uglify())
	    .on('error', notify.onError('Error: <%= error.message %>'))
	    .pipe(rename({
	        extname: '.head.min.js'
	     }))
	    .pipe(gulp.dest('resources/script/min'))
	    .pipe(notify('JS Head ( ' + moment().format('h:mm:ss') + ' )'));
});

gulp.task('after-js', 'Concat, Uglify JavaScript into a single JS.', function() {
    gulp.src([
    		'resources/lib/angular2.sfx.dev.js', 
			'resources/lib/theme-public/js/vendor/jquery.easing.1.3.js',
			'resources/lib/theme-public/js/vendor/jquery.stellar.min.js',
			'resources/lib/theme-public/js/vendor/jquery.flexslider-min.js',
			'resources/lib/theme-public/js/vendor/jquery.countTo.js',
			'resources/lib/theme-public/js/vendor/jquery.appear.js',
			'resources/lib/theme-public/js/vendor/jquery.magnific-popup.min.js',
			'resources/lib/theme-public/js/vendor/owl.carousel.min.js',
			'resources/lib/bootstrap-3.3.7/js/button.js', 
			'resources/lib/bootstrap-3.3.7/js/collapse.js', 
			'resources/lib/bootstrap-3.3.7/js/dropdown.js', 
			'resources/lib/bootstrap-3.3.7/js/modal.js', 
			'resources/lib/bootstrap-3.3.7/js/tab.js', 
			'resources/lib/theme-public/js/vendor/jquery.waypoints.min.js'
    	])
        .pipe(concat('unboxanodeblog'))
	    //.pipe(uglify())
        .on('error', notify.onError('Error: <%= error.message %>'))
        .pipe(rename({
            extname: '.vendor.min.js'
         }))
        .pipe(gulp.dest('resources/script/min'))
        .pipe(notify('JS Vendor ( ' + moment().format('h:mm:ss') + ' )'));
	gulp.src([
			'resources/lib/theme-public/js/main.js', 
			'resources/script/unboxanodeblog.js'
		])
	    .pipe(concat('unboxanodeblog'))
	    //.pipe(uglify())
	    .on('error', notify.onError('Error: <%= error.message %>'))
	    .pipe(rename({
	        extname: '.foot.min.js'
	     }))
	    .pipe(gulp.dest('resources/script/min'))
	    .pipe(notify('JS Foot ( ' + moment().format('h:mm:ss') + ' )'));
});

gulp.task('sass', 'Compile scss into a single css.', function() {
    gulp.src([
			'resources/lib/theme-public/css/styles-merged.min.css',
       		'resources/style/*.scss'
    	])
        .pipe(concat('unboxanodeblog'))
        .pipe(sass())
        .on('error', notify.onError('Error: <%= error.message %>'))
		.pipe(rename({
		    extname: '.min.css'
		 }))
        .pipe(gulp.dest('resources/style/min'))
        .pipe(notify('CSS ( ' + moment().format('h:mm:ss') + ' )'));
});

gulp.task('html-build-public', 'Build public HTML files with partials.', function() {
    gulp.src([
    		'views/site/*.html'
		])
		.pipe(template('views/layouts/public.html'))
		.pipe(gulp.dest('views/dist'))
		.pipe(notify('Public HTML ( ' + moment().format('h:mm:ss') + ' )'));
	gulp.src([
			'views/blog/*.html'
		])
		.pipe(template('views/layouts/public.html'))
		.pipe(gulp.dest('views/dist/blog'))
		.pipe(notify('Blog HTML ( ' + moment().format('h:mm:ss') + ' )'));
	gulp.src([
			'views/projects/*.html'
		])
		.pipe(template('views/layouts/public.html'))
		.pipe(gulp.dest('views/dist/projects'))
		.pipe(notify('Projects HTML ( ' + moment().format('h:mm:ss') + ' )'));
});

gulp.task('html-build-auth', 'Build authenticated HTML files with partials.', function() {
	/*
    gulp.src([
    		'views/user/userDashboard.html',
    		'views/user/userDashboard.html'
		])
		.pipe(template('views/layouts/authenticated.html'))
		.pipe(gulp.dest('views/dist'))
		.pipe(notify('Auth*d HTML ( ' + moment().format('h:mm:ss') + ' )'));
		*/
});

gulp.task('watch', [], function() {

	watch([
		'resources/script/*.js',
		'resources/lib/**/*.js'
	], function() {
		gulp.start('before-js');
		gulp.start('after-js');
	});
	watch([
		'resources/style/*.scss',
		'resources/lib/**/*.scss'
	], function() {
		gulp.start('sass');
	});
	watch([
		'views/layouts/*.html',
		'views/site/*.html',
		'views/blog/*.html',
		'views/projects/*.html'
	], function() {
		gulp.start('html-build-public');
		//gulp.start('html-build-auth');
	});
});

gulp.task('default', defaultTasks);
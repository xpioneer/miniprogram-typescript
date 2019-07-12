const gulp = require('gulp'),
	sass = require('gulp-sass'),
	terser = require('gulp-terser'),
	rename = require('gulp-rename'),
	ts = require('gulp-typescript'),
	postcss = require('gulp-postcss'),
	cleanCSS = require('gulp-clean-css'),
	px2rpx = require('./px2rpx'),
	autoprefixer = require('autoprefixer');

const tsProject = ts.createProject('tsconfig.json');

const src = {
	scss: 'src/**/*.scss',
	ts: 'src/**/*.ts'
}

gulp.task('build:scss', () => gulp.src(src.scss)
	.pipe(sass())
	.pipe(postcss([ autoprefixer() ]))
	.pipe(px2rpx())
	.pipe(cleanCSS())
	.pipe(rename(path => {
    path.extname = '.wxss'
  }))
  .pipe(gulp.dest('dist'))
)

gulp.task('build:ts', () => gulp.src(src.ts)
	.pipe(tsProject())
	.pipe(rename(path => {
    path.extname = '.js'
	}))
	.pipe(terser())
  .pipe(gulp.dest('dist'))
)

gulp.task('copy', () => gulp.src(['src/**/*', '!src/**/*.ts', '!src/**/*.scss']).pipe(gulp.dest('dist')))

gulp.task('watch', () => gulp.watch('src/**/*.*', gulp.series('build:scss', 'build:ts', 'copy')))

gulp.task('build', gulp.series('build:scss', 'build:ts', 'copy'))

gulp.task('default', done => {
	console.log(`
		commands:
		npm run start :  show commands
		npm run dev   :  development mode
		npm run build :  production mode
	`)
	done()
})
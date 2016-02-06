# gulp-md5-plus-always

it fork from gulp-md5-plus(https://github.com/wpfpizicai/gulp-md5-plus)

> md5 plugin for [gulp](https://github.com/wpfpizicai/gulp-md5-plus) ,md5 the static files(eg javascript style image files) ;then replace the filenames in css or the html if needed by passing the file or dir in the second parameter

src 
<script src="/js/a.js"></scripts>

asume md5 is 223b3932

gulp-md5-plus
<pre>
<script src="/js/a_223b3932.js"></scripts>
</pre>

gulp-md5-plus-always.
<pre>
<script src="/js/a.js?v=223b3932.js"></scripts>
</pre>

if a.js is changed and md5 is 12f3243
gulp-md5-plus do not change the output.
<pre>
<script src="/js/a_223b3932.js"></scripts>
</pre>

gulp-md5-plus-always will change it again
<pre>
<script src="/js/a.js?v=12f3243.js"></scripts>
</pre>


## Usage

First, install `gulp-md5-plus-always` as a development dependency:

```shell
npm install --save-dev gulp-md5-plus-always
```

Then, add it to your `gulpfile.js`:

```javascript
var md5 = require("gulp-md5-plus-always");

gulp.src("./src/*.css")
	.pipe(md5(10,'./output/index.html'))
	.pipe(gulp.dest("./dist"));
```

md5 all css files in the src folder and change these css names in the quoted html--index.html

```javascript

gulp.task('img' ,function() {
    var imgSrc = './static/img/**',
        quoteSrc = './output/static/css/**/*.css', // [./output/static/css/**/*.css',./output/static/js/**/*.js']
        imgDst = './output/static/img';

    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(md5(10 ,quoteSrc))
        .pipe(gulp.dest(imgDst));
});

```

first, optimize all images in the img folder including all sub folders; then md5 all these images and change these images' names in the quoted css files ;

####note
the directory of the md5ed files in the imgDst folder is the same as that of original files in the imgSrc folder; and css files can refer the image file with the same name in different folder rightly;

## API

### md5(size,file)

#### size
Type: `String`
Default: null

Optionnal: you can pass the size to limit the size of the hash that is appended.

#### file
Type: `String`
Default: null

Optionnal: the file need to replace the file name of the md5ed files. dir is also supported

Example:
```javascript
	gulp.src('static/js/*')
        .pipe(md5(10,'./output/html'))
        .pipe(gulp.dest('./output'));
```

The sample above will append the md5 hash(length : 10) to each of the file in the static/js folder then repalce the link file name in the output/html/ using md5ed file name; at last store all of that into the *output* folder.



## License

http://en.wikipedia.org/wiki/MIT_License[MIT License]



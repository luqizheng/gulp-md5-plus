var path = require('path')
, gutil = require('gulp-util')
, through = require('through2')
, crypto = require('crypto')
, fs = require('fs')
, glob = require('glob');

module.exports = function (size, ifile) {

    size = size | 0;
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        if (!file.contents) {
            return cb();
        }

        var d = calcMd5(file, size)
        , filename = path.basename(file.path)
        , relativepath = path.relative(file.base, file.path)
        , sub_namepath = relativepath.replace(new RegExp(filename), "").split(path.sep).join('/')
        , dir;

        if (file.path[0] == '.') {
            dir = path.join(file.base, file.path);
        } else {
            dir = file.path;
        }
        dir = path.dirname(dir);        
        var md5_filename = filename + "?v=" + d;
        console.log(md5_filename);

        if (Object.prototype.toString.call(ifile) == "[object Array]") {
            ifile.forEach(function (i_ifile) {
                replaceIncludeFile(i_ifile, md5_filename, filename);                
            })
        } else {
            replaceIncludeFile(i_ifile, md5_filename, filename);            
        }

        file.path = path.join(dir, filename);

        this.push(file);
        cb();
    }, function (cb) {
        cb();
    });
};


function replaceIncludeFile(i_ifile, md5_filename, filename) {
    i_ifile && glob(i_ifile, function (err, i_files) {
        if (err) return console.log(err);
        i_files.forEach(function (i_ilist) {
            var regexd = filename + "(\\?v=[a-zA-Z_0-9]*){0,1}";
            var result = fs.readFileSync(i_ilist, 'utf8').replace(new RegExp(regexd, "g"), function (sfile_name) {
                return sfile_name.replace(sfile_name, md5_filename)
            });
            fs.writeFileSync(i_ilist, result, 'utf8');
        })
    })
}


function calcMd5(file, slice) {
    var md5 = crypto.createHash('md5');
    md5.update(file.contents, 'utf8');

    return slice > 0 ? md5.digest('hex').slice(0, slice) : md5.digest('hex');
}

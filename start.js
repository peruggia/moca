console.log('Started!');
var sass = require('node-sass'),
  fs = require('fs');

var result = sass.render({
  file: './assets/style.sass',
  outFile: './assets/output.css'
}, function(error, result) { // node-style callback from v3.0.0 onwards
    if(!error){
      // No errors during the compilation, write this result on the disk
      fs.writeFile('./assets/output.css', result.css, function(err){
        if(!err){
          //file written on disk
        }
      });
    }
  });

//require('./index.js');
'use strict'
/*
  read idr solutions html file, parse out all the lines with inputs and remove them
  from the output file.  Capture the data in the a list of field objects and return it.

  using returned object create react components for all fields and render underneath
  <form class="broadridge" >

*/
var fs = require('fs');

var getMatchers = function getMatchers(){

  // let inputmatcher = /<input(\s+(\w+)="([^"]*)")+\s*\/>/; 
  // let inputmatcher = /<input(\s+(\w+)="([^"]*)")+\s*\/>/; 
  // let inputmatcher = /<input(\s+(\w+)="([a-zA-Z0-9_\-\#\.\/ ]*)")+\s*((images)="(\w*)")+\s*\/>/ig; 
  let typematch=/(type)=\"([^"]*)"/;
  let tabmatch=/(tabindex)=\"([^"]*)"/;
  let idmatch=/(id)=\"([^"]*)"/;
  let namematch=/(name)=\"([^"]*)"/;
  let pdfmatch=/(pdfFieldName)=\"([^"]*)"/i;
  let valuematch=/(value)=\"([^"]*)"/i;
  let imagenamematch=/(imageName)=\"([^"]*)"/i;
  let imagesmatch=/(images)=\"([^"]*)"/i;
  let matchpairs = [];
  matchpairs.push(typematch);
  matchpairs.push(tabmatch);
  matchpairs.push(idmatch);
  matchpairs.push(namematch);
  matchpairs.push(pdfmatch);
  matchpairs.push(valuematch);
  matchpairs.push(imagenamematch);
  matchpairs.push(imagesmatch);

  return matchpairs;
}



// cb(err, [{fieldattributes}])
module.exports = function(inputfile,outputfile,cb){

  fs.readFile( inputfile,'utf8', function(err,data){
    if(err){
      return cb(err, undefined);
    }
    // if (outputfile)
    //   console.log("outputfile = " + outputfile);
    let openformtag = false;
    let closeformtag = false;
    let formtagstart = '<form';
    let formtagstop = '</form>';
    let abbrstartmatcher = /<abbr\s+title="([^"]*)"\s*>/;
    let abbrstop = /<\/abbr>/;
    let outstr = '';
    let matchpairs = getMatchers();
    let abbrs = [];
    if(data){
      data.toString().split('\n').forEach( line => { 
        if (closeformtag || (openformtag&&line.trim().startsWith(formtagstop))){
          // console.log(line);
          if (outputfile)
            outstr = outstr.concat(line).concat('\n');
          closeformtag=true;
          return;
        }
        if (!openformtag) {
          //console.log(line) ;
          if (outputfile)
            outstr = outstr.concat(line).concat('\n');
        } 
        if (line.trim().startsWith(formtagstart)){
          openformtag = true;
          return;
        }
        /* we are between the open formtag and close formtag 
          - do not echo
          - build react entity info
          - assumes each line has <abbr title="x"><input type="y" tabindexs="2" ..../>
        */
        let abbr = {};
        let abbrmatches = line.match(abbrstartmatcher);
        if (!abbrmatches)
          return; // no match go to next line
        abbr.title=abbrmatches[1];

        matchpairs.forEach( mpair => {
          let matchpr = line.match(mpair);
          if(matchpr){
            abbr[matchpr[1]] = matchpr[2];
          // console.log("matchpr: " + matchpr[1] + " ," + matchpr[2] );
          }
        });
        // console.log("===abbr: " + JSON.stringify(abbr));
        abbrs.push(abbr);
      });
    }
    if (outputfile){
//      console.log("length of outstr = " + outstr.length);
      fs.writeFile(outputfile, outstr, function(err){
        if (err){
          return (err,abbrs);
        }
      });
    }
    cb(undefined,abbrs);
  });
}

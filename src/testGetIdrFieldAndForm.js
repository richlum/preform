
'use strict'
var getFieldObj = require('./getIdrFieldsAndForm');


getFieldObj('./1.html','/tmp/1b.html',function(err,data){
	if (err) {
		return console.err(err.getmessage());
	}
	// data.forEach( fld => {
	// 	console.log(JSON.stringify(fld));
  // });
  console.log(JSON.stringify(data,null,2));
});


var key = require('../utils/key');
var Yelp = require('yelp');

module.exports = function(req, res) {
  var url = req.query.url.trim();
  yelp_business_id = url.split('/').pop();
  var yelp = new Yelp(key);
  yelp.business(yelp_business_id).then(function(data)
  {
    var html = "<div><style>body{font-family: 'Helvetica Neue'; font-weight: 300; font-size: 13px; padding: 10px}#wrap{width:300px;margin:0 auto}#left_col{float:left;width:150px}#right_col{float:right;width:150px}</style>";
    html+= "<h1 style='font-family: 'Helvetica Neue'; font-weight: 300;'>"+data.name+'</h1>';
    html+='</div>';
    html+='<div id="wrap"><div id="left_col">';
    html+="<img src='"+data.image_url+"'><br>";
    html+="<img src='"+data.rating_img_url+"'>";
    html+='</div><div id="right_col">';
    html+='<p style="margin: 0px;">'+data.location.display_address+'</p>';
    html+='<a href="tel:'+data.phone+'">'+data.display_phone+'</a><br>';
    html+='<a style="margin: 0px;" href='+data.url+'>View on Yelp</a>';
    res.json({
      body: html
    });
  }).catch(console.error);
};
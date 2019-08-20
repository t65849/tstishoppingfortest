// Application Log
var log4js = require('log4js');
var log4js_extend = require('log4js-extend');
log4js_extend(log4js, {
  path: __dirname,
  format: '(@file:@line:@column)'
});
log4js.configure(__dirname + '/log4js.json');
var logger = log4js.getLogger('bot');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hashtable = require(__dirname + '/hashtable.js');

// Setup Express Server
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
});

var config = require('fs').readFileSync(__dirname + '/config.json');
config = JSON.parse(config); //字串轉物件

app.get('/api', function (request, response) {
  response.send('API is running test');
});

app.get('/logs', function (request, response) {
  var stream = require('fs').createReadStream('logs/messaging.log');
  stream.pipe(response);
});

app.post('/messages', function (request, response) {
  response.send('');
  logger.info(request.body);
  logger.info(JSON.stringify(request.body));
  var bodys = request.body;
  if(bodys.result !== undefined){
    var result = bodys.result;
    var entrie = Object.entries(result);
    var key = Object.keys(result);
    var value = Object.values(result);
    console.log(typeof(entrie));
    for(var i =0; i < entrie.length; i++){
      if(key[i].indexOf("time") != -1){
        var tmp = new Array();
        tmp = entrie[0];
        entrie[0] = entrie[i];
        entrie[i] = tmp;
      }
    }
    console.log(JSON.stringify(entrie));
    console.log(typeof(entrie));
    SendFlexMessage("C3febbf29c0f0bd33601da24998fde2da", entrie, 'tstiisacompanyfortatung', null, function (ret) {
    });
    //R230fdb328b23308c554983ab07a4543f
  } else {
    console.log("Conversation");
  }
});

function SendFlexMessage(userId, result, password, reply_token, callback) {
  if (password == 'tstiisacompanyfortatung') {
    var flex_content = new Array();
    var result_keys = Object.keys(result);
    console.log(JSON.stringify(result_keys));
    var result_values = Object.values(result);
    console.log(JSON.stringify(result_values));
    for(var i = 0; i < result_keys.length; i++){
      var result_entries = Object.entries(result);
      var result_data = {
        "type": "box",
        "layout": "baseline",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": result_keys[i]+"：",
            "align": "end",
            "color": "#aaaaaa",
            "size": "md",
            "flex": 2
          },
          {
            "type": "text",
            "text": result_values[i],
            "wrap": true,
            "color": "#666666",
            "size": "md",
            "flex": 3
          }
        ]
      };
      flex_content.push(result_data);
    }
    console.log("103");
    console.log(JSON.stringify(flex_content));
    var data = {
      'to': userId,
      'messages': [
        {
          "type": "flex",
          "altText": "告警訊息",
          "contents": {
            "type": "bubble",
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [
                {
                  "type": "text",
                  "text": "告警訊息",
                  "weight": "bold",
                  "size": "xl"
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "lg",
                  "spacing": "sm",
                  "contents": flex_content
                }
              ]
            }
          }
        }
      ]
    };
    //
    /*ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
      if (ret) {
        this.callback(true);
      } else {
        PostToLINE(data, config.channel_access_token, this.callback);
      }
    }.bind({ callback: callback }));*/
  } else {
    callback(false);
  }
}

app.post('/api/alert_action', function (request, response) {
  console.log('POST /api/alert_action');
  console.log(JSON.stringify(request.body));
  var sourcetype = request.body.result.sourcetype;
  var count = request.body.result.count;
  var sid = request.body.sid;
  var results_link = request.body.results_link;
  var search_name = request.body.search_name;
  var owner = request.body.owner;
  var admin = request.body.admin;
  var message_string = "sourcetype:" + sourcetype + "\n" + "count:" + count + "\n" + "sid:" + sid + "\n" + "results_link:" + results_link + "\n" + "search_name:" + search_name + "\n" + "owner:" + owner + "\n" + "admin:" + admin;
  SendMessage("R230fdb328b23308c554983ab07a4543f", message_string, 'tstiisacompanyfortatung', "reply_token", function (ret) {
    if (ret) {
      response.send({ "success": "success" });
    } else {
      response.send({ "error": "error" });
    }
  });
  //response.send({ "success": "success" });
});

app.get('/Splunk', function (request, response) {
  request.header("Content-Type", 'text/html');
  const fs = require('fs');
  const path = require('path');
  fs.readFile(__dirname + '/pages/Splunk.html', 'utf8', function (err, data) {
    if (err) {
      this.res.send(err);
    }
    this.res.send(data);
  }.bind({ req: request, res: response }));
})

var http = require('http');
var server = http.Server(app);	// create express server
var options = {
  pingTimeout: 60000,
  pingInterval: 3000
};
var listener = server.listen(process.env.port || process.env.PORT || 3978, function () {
  logger.info('Server listening to ' + listener.address().port);
});

process.on('uncaughtException', function (err) {
  logger.error('uncaughtException occurred: ' + (err.stack ? err.stack : err));
});

// 傳送訊息給 LINE 使用者
function SendMessage(userId, message, password, reply_token, callback) {
  if (password == 'tstiisacompanyfortatung') {
    var data = {
      'to': userId,
      'messages': [
        { 'type': 'text', 'text': message }
      ]
    };
    logger.info('傳送訊息給 ' + userId);
    /*ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
        if (!ret) {
            PostToLINE(data, config.channel_access_token, this.callback);
        } 
    });*/
    ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
      if (ret) {
        this.callback(true);
      } else {
        PostToLINE(data, config.channel_access_token, this.callback);
      }
    }.bind({ callback: callback }));
  } else {
    callback(false);
  }
}

// 傳送[可點選圖片]給 LINE 使用者
function SendImagemap(userId, baseUrl, altText, imagemap, password, reply_token, callback) {
  if (password == 'tstiisacompanyfortatung') {
    var data = {
      'to': userId,
      'messages': [{
        "type": "imagemap",
        "baseUrl": baseUrl,
        "altText": altText,
        "baseSize": {
          "height": 693,
          "width": 1040
        },
        "actions": imagemap
      }]
    };
    logger.info('傳送訊息給 ' + userId);
    logger.info('傳送圖片網址: ' + baseUrl);
    /*ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
        if (!ret) {
            PostToLINE(data, config.channel_access_token, this.callback);
        } 
    });*/
    ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
      if (ret) {
        this.callback(true);
      } else {
        PostToLINE(data, config.channel_access_token, this.callback);
      }
    }.bind({ callback: callback }));
  } else {
    callback(false);
  }
}
// 傳送【選單】給 LINE 使用者
function SendButtons(userId, image_url, title, text, buttons, alt_text, password, reply_token, callback) {
  if (password == 'tstiisacompanyfortatung') {
    var data = {
      'to': userId,
      'messages': [{
        'type': 'template',
        'altText': alt_text,
        'template': {
          'type': 'buttons',
          'thumbnailImageUrl': image_url,
          'title': title,
          'text': text,
          'actions': buttons
        }
      }]
    };
    logger.info('傳送訊息給 ' + userId);
    ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
      if (ret) {
        this.callback(true);
      } else {
        PostToLINE(data, config.channel_access_token, this.callback);
      }
    }.bind({ callback: callback }));
  } else {
    callback(false);
  }
}

// 傳送【確認】給 LINE 使用者
function SendConfirm(userId, text, buttons, alt_text, password, reply_token, callback) {
  if (password == 'tstiisacompanyfortatung') {
    var data = {
      'to': userId,
      'messages': [{
        'type': 'template',
        'altText': alt_text,
        'template': {
          'type': 'confirm',
          'text': text,
          'actions': buttons
        }
      }]
    };
    logger.info('傳送訊息給 ' + userId);
    ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
      if (ret) {
        this.callback(true);
      } else {
        PostToLINE(data, config.channel_access_token, this.callback);
      }
    }.bind({ callback: callback }));
  } else {
    callback(false);
  }
}

// 傳送【可滾動選單】給 LINE 使用者
function SendCarousel(userId, columns, password, reply_token, callback) {
  if (password == 'tstiisacompanyfortatung') {
    var data = {
      'to': userId,
      'messages': [{
        'type': 'template',
        'altText': '請至行動裝置檢視訊息',
        'template': {
          'type': 'carousel',
          'columns': columns
        }
      }]
    };
    logger.info('傳送訊息給 ' + userId);
    ReplyMessage(data, config.channel_access_token, reply_token, function (ret) {
      if (ret) {
        this.callback(true);
      } else {
        PostToLINE(data, config.channel_access_token, this.callback);
      }
    }.bind({ callback: callback }));
  } else {
    callback(false);
  }
}

// 直接回覆訊息給 LINE 使用者
function ReplyMessage(data, channel_access_token, reply_token, callback) {
  data.replyToken = reply_token;
  logger.info(JSON.stringify(data));
  var options = {
    host: 'api.line.me',
    port: '443',
    path: '/v2/bot/message/reply',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Content-Length': Buffer.byteLength(JSON.stringify(data)),
      'Authorization': 'Bearer <' + channel_access_token + '>'
    }
  };
  var https = require('https');
  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      logger.info('Response: ' + chunk);
    });
    res.on('end', function () {
    });
    logger.info('Reply message status code: ' + res.statusCode);
    if (res.statusCode == 200) {
      logger.info('Reply message success');
      this.callback(true);
    } else {
      logger.info('Reply message failure');
      this.callback(false);
    }
  }.bind({ callback: callback }));
  req.write(JSON.stringify(data));
  req.end();
}

// 取得 LINE 使用者資訊
function GetProfile(userId, callback) {
  var https = require('https');
  var options = {
    host: 'api.line.me',
    port: '443',
    path: '/v2/bot/profile/' + userId,
    method: 'GET',
    headers: {
      'Authorization': 'Bearer <' + config.channel_access_token + '>'
    }
  };

  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      logger.info('Response: ' + chunk);
      if (res.statusCode == 200) {
        var result = JSON.parse(chunk);
        logger.info('displayName: ' + result.displayName);
        logger.info('userId: ' + result.userId);
        logger.info('pictureUrl: ' + result.pictureUrl);
        logger.info('statusMessage: ' + result.statusMessage);
        callback(result);
      } if (res.statusCode == 401) {
        logger.info('IssueAccessToken');
        IssueAccessToken();
      }
    });
  }).end();
}

function PostToLINE(data, channel_access_token, callback) {
  logger.info(JSON.stringify(data));
  var options = {
    host: 'api.line.me',
    port: '443',
    path: '/v2/bot/message/push',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Content-Length': Buffer.byteLength(JSON.stringify(data)),
      'Authorization': 'Bearer <' + channel_access_token + '>'
    }
  };
  var https = require('https');
  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      logger.info('Response: ' + chunk);
    });
  });
  req.write(JSON.stringify(data));
  req.end();
  try {
    callback(true);
  } catch (e) { };
}
function IssueAccessToken() {
  var https = require('https');
  var options = {
    host: 'api.line.me',
    port: '443',
    path: '/v2/oauth/accessToken',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  options.form = {};
  options.form.grant_type = 'client_credentials';
  options.form.client_id = config.channel_id;
  options.form.client_secret = config.channel_secret;

  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      logger.info('Response: ' + chunk);
      if (res.statusCode == 200) {
        var result = JSON.parse(chunk);
        config.channel_access_token = result.access_token;
        var fs = require('fs');
        fs.writeFile(__dirname + '/config.json', JSON.stringify(config), function (err) {
          if (err) {
            logger.error(e);
          }
        });
      }
    });
  }).end();
}
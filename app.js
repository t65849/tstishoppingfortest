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
    /*response.send('');
    logger.info(request.body);
    var results = request.body.events;
    logger.info(JSON.stringify(results));
    logger.info('receive message count: ' + results.length);
    for (var idx = 0; idx < results.length; idx++) {
        var acct = results[idx].source.userId;
        var reply_token = results[idx].replyToken;
        logger.info('userId: ' + acct);
        logger.info('reply token: ' + results[idx].replyToken);
        logger.info('createdTime: ' + results[idx].timestamp);
        logger.info('from: ' + results[idx].source.userId);
        logger.info('type: ' + results[idx].type);
        if (results[idx].type == 'message') {
            var text = results[idx].message.text;
            text = JSON.parse(text);
            var sourcetype = text.result.sourcetype;
            sourcetype = sourcetype.toString();
            var count = text.result.count;
            count = count.toString();
            var sid = text.sid;
            sid = sid.toString();
            var results_link = text.results_link;
            results_link = results_link.toString();
            var search_name = text.search_name;
            if(search_name == null){
                search_name = "null";
            }
            search_name = search_name.toString();
            var owner = text.owner;
            owner = owner.toString();
            var app = text.app;
            app = app.toString();*/
            console.log("74");
            console.log(request.body);
            var bodys = request.body;
            var sourcetype = bodys.result.sourcetype;
            sourcetype = sourcetype.toString();
            var count = bodys.result.count;
            count = count.toString();
            var sid = bodys.sid;
            sid = sid.toString();
            var results_link = bodys.results_link;
            results_link = results_link.toString();
            var search_name = bodys.search_name;
            if(search_name == null){
                search_name = "null";
            }
            search_name = search_name.toString();
            var owner = bodys.owner;
            owner = owner.toString();
            var app = bodys.app;
            app = app.toString();
            SendFlexMessage("R230fdb328b23308c554983ab07a4543f", sourcetype, count, sid, results_link, search_name, owner, app,'tstiisacompanyfortatung', reply_token, function (ret) {
              //
          });
          SendFlexMessage("C3febbf29c0f0bd33601da24998fde2da", sourcetype, count, sid, results_link, search_name, owner, app,'tstiisacompanyfortatung', reply_token, function (ret) {
            //
        });
            //var messages = "sourcetype:"+sourcetype+"\n" + "count:"+count+"\n" + "sid:"+sid+"\n" + "results_link:"+results_link+"\n" + "search_name:"+search_name+"\n" + "owner:"+owner+"\n" + "app:"+app;
            /*SendMessage(acct, messages, 'tstiisacompanyfortatung', reply_token, function (ret) {
                if(ret == false){
                    SendMessage("R230fdb328b23308c554983ab07a4543f", messages, 'tstiisacompanyfortatung', "reply_token", function (ret) {
                    });
                    SendMessage("R230fdb328b23308c554983ab07a4543f", "error", 'tstiisacompanyfortatung', "reply_token", function (ret) {
                    });
                }
            });*/
            /*SendFlexMessage(acct, sourcetype, count, sid, results_link, search_name, owner, app,'tstiisacompanyfortatung', reply_token, function (ret) {
                //
            })*/
            //SendMessage("R230fdb328b23308c554983ab07a4543f", messages, 'tstiisacompanyfortatung', "reply_token", function (ret) {
                /*if(ret){
                    response.send({ "success": "success" });
                } else {
                    response.send({ "error": "error" });
                }*/
            //});
        //}
    //}
});

function SendFlexMessage(userId, sourcetype, count, sid, results_link, search_name, owner, app, password, reply_token, callback) {
    if (password == 'tstiisacompanyfortatung') {
        var data = {
            'to': userId,
            'messages': [
                {
                    "type": "flex",
                    "altText": "Splunk",
                    "contents": {
                        "type": "bubble",
                        "body": {
                          "type": "box",
                          "layout": "vertical",
                          "contents": [
                            {
                              "type": "text",
                              "text": "Splunk訊息",
                              "weight": "bold",
                              "size": "xl"
                            },
                            {
                              "type": "box",
                              "layout": "vertical",
                              "margin": "lg",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "box",
                                  "layout": "baseline",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "sourcetype:",
                                      "align": "center",
                                      "color": "#aaaaaa",
                                      "size": "md",
                                      "flex": 2
                                    },
                                    {
                                      "type": "text",
                                      "text": sourcetype,
                                      "wrap": true,
                                      "color": "#666666",
                                      "size": "md",
                                      "flex": 3
                                    }
                                  ]
                                },
                                {
                                  "type": "box",
                                  "layout": "baseline",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "text",
                                      "text": "count:",
                                      "align": "center",
                                      "color": "#aaaaaa",
                                      "size": "md",
                                      "flex": 2
                                    },
                                    {
                                      "type": "text",
                                      "text": count,
                                      "wrap": true,
                                      "color": "#666666",
                                      "size": "md",
                                      "flex": 3
                                    }
                                  ]
                                }
                              ]
                            },{
                                "type": "box",
                                "layout": "vertical",
                                "margin": "lg",
                                "spacing": "sm",
                                "contents": [
                                  {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "sid:",
                                        "align": "center",
                                        "color": "#aaaaaa",
                                        "size": "md",
                                        "flex": 2
                                      },
                                      {
                                        "type": "text",
                                        "text": sid,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "md",
                                        "flex": 3
                                      }
                                    ]
                                  },
                                  {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "results_link:",
                                        "align": "center",
                                        "color": "#aaaaaa",
                                        "size": "md",
                                        "flex": 2
                                      },
                                      {
                                        "type": "text",
                                        "text": results_link,
                                        "action": {
                                            "type":  "uri",
                                            "uri": results_link
                                        },
                                        "wrap": true,
                                        "color": "#0000ff",
                                        "size": "md",
                                        "flex": 3
                                      }
                                    ]
                                  },
                                  {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "search_name:",
                                        "align": "center",
                                        "color": "#aaaaaa",
                                        "size": "md",
                                        "flex": 2
                                      },
                                      {
                                        "type": "text",
                                        "text": search_name,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "md",
                                        "flex": 3
                                      }
                                    ]
                                  }
                                ]
                              },{
                                "type": "box",
                                "layout": "vertical",
                                "margin": "lg",
                                "spacing": "sm",
                                "contents": [
                                  {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "owner:",
                                        "align": "center",
                                        "color": "#aaaaaa",
                                        "size": "md",
                                        "flex": 2
                                      },
                                      {
                                        "type": "text",
                                        "text": owner,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "md",
                                        "flex": 3
                                      }
                                    ]
                                  },
                                  {
                                    "type": "box",
                                    "layout": "baseline",
                                    "spacing": "sm",
                                    "contents": [
                                      {
                                        "type": "text",
                                        "text": "app:",
                                        "align": "center",
                                        "color": "#aaaaaa",
                                        "size": "md",
                                        "flex": 2
                                      },
                                      {
                                        "type": "text",
                                        "text": app,
                                        "wrap": true,
                                        "color": "#666666",
                                        "size": "md",
                                        "flex": 3
                                      }
                                    ]
                                  }
                                ]
                              }
                          ]
                        }
                      }
                }
            ]
        };
        /*var data = {
            'to': userId,
            'messages': [
                {
                    "type": "flex",
                    "altText": "e同購特價商品",
                    "contents": {
                        "type": "carousel",
                        "contents": [
                          {
                            "type": "bubble",
                            "hero": {
                              "type": "image",
                              "size": "full",
                              "aspectRatio": "20:13",
                              "aspectMode": "fit",
                              "url": "https://www.etungo.com.tw/files/TC_PSpec/PS_Pic/PF-6374.jpg"
                            },
                            "body": {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "【有情】紫外線不銹鋼烘碗機",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl"
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "baseline",
                                      "contents": [
                                        {
                                          "type": "text",
                                          "text": "促銷價",
                                          "weight": "bold",
                                          "margin": "md",
                                          "color": "#e60412",
                                          "flex": 0
                                        },
                                        {
                                          "type": "text",
                                          "text": "$4,392",
                                          "weight": "bold",
                                          "size": "md",
                                          "align": "end",
                                          "color": "#e60412"
                                        }
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "text": ".101公升超大容量",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    },
                                    {
                                      "type": "text",
                                      "text": "․買就送14吋立扇一台",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    }
                                  ]
                                }
                              ]
                            },
                            "footer": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "spacer",
                                  "size": "xxl"
                                },
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "color": "#e60412",
                                  "action": {
                                    "type": "uri",
                                    "label": "點擊查看",
                                    "uri": "line://app/1593612875-l9rBKQ82"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "type": "bubble",
                            "hero": {
                              "type": "image",
                              "size": "full",
                              "aspectRatio": "20:13",
                              "aspectMode": "fit",
                              "url": "https://www.etungo.com.tw/files/TC_PSpec/PS_Pic/JL-090PDs.jpg"
                            },
                            "body": {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "【家適帝】口腔護理衝牙機",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl"
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "baseline",
                                      "contents": [
                                        {
                                          "type": "text",
                                          "text": "促銷價",
                                          "weight": "bold",
                                          "margin": "md",
                                          "color": "#e60412",
                                          "flex": 0
                                        },
                                        {
                                          "type": "text",
                                          "text": "$599",
                                          "weight": "bold",
                                          "size": "md",
                                          "align": "end",
                                          "color": "#e60412"
                                        }
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "text": ".贈噴頭收納盒",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    }
                                  ]
                                }
                              ]
                            },
                            "footer": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "spacer",
                                  "size": "xxl"
                                },
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "color": "#e60412",
                                  "action": {
                                    "type": "uri",
                                    "label": "點擊查看",
                                    "uri": "https://www.etungo.com.tw/inside/377/724/742/66110.html?kw=LINE&utm_medium=Click&utm_campaign=20180720_JL-090PD"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "type": "bubble",
                            "hero": {
                              "type": "image",
                              "size": "full",
                              "aspectRatio": "20:13",
                              "aspectMode": "fit",
                              "url": "https://www.etungo.com.tw/files/TC_PSpec/PS_Pic/LMG008s.jpg"
                            },
                            "body": {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "【LMG長野】316不銹鋼三件式提鍋",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl"
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "baseline",
                                      "contents": [
                                        {
                                          "type": "text",
                                          "text": "促銷價",
                                          "weight": "bold",
                                          "margin": "md",
                                          "color": "#e60412",
                                          "flex": 0
                                        },
                                        {
                                          "type": "text",
                                          "text": "$1580",
                                          "weight": "bold",
                                          "size": "md",
                                          "align": "end",
                                          "color": "#e60412"
                                        }
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "text": ".限時折扣",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    }
                                  ]
                                }
                              ]
                            },
                            "footer": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "spacer",
                                  "size": "xxl"
                                },
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "color": "#e60412",
                                  "action": {
                                    "type": "uri",
                                    "label": "點擊查看",
                                    "uri": "https://www.etungo.com.tw/inside/414/756/763/63877.html?kw=LINE&utm_medium=Click&utm_campaign=20180720_LMG008"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "type": "bubble",
                            "hero": {
                              "type": "image",
                              "size": "full",
                              "aspectRatio": "20:13",
                              "aspectMode": "fit",
                              "url": "https://www.etungo.com.tw/files/TC_PSpec/PS_Pic/ECO1L-GN.jpg"
                            },
                            "body": {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "【綠恩家】健康氣泡水機",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl"
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "baseline",
                                      "contents": [
                                        {
                                          "type": "text",
                                          "text": "促銷價",
                                          "weight": "bold",
                                          "margin": "md",
                                          "color": "#e60412",
                                          "flex": 0
                                        },
                                        {
                                          "type": "text",
                                          "text": "$1780",
                                          "weight": "bold",
                                          "size": "md",
                                          "align": "end",
                                          "color": "#e60412"
                                        }
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "text": ".讓水更有趣",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    }
                                  ]
                                }
                              ]
                            },
                            "footer": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "spacer",
                                  "size": "xxl"
                                },
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "color": "#e60412",
                                  "action": {
                                    "type": "uri",
                                    "label": "點擊查看",
                                    "uri": "https://www.etungo.com.tw/inside/377/723/738/64287.html?kw=LINE&utm_medium=Click&utm_campaign=20180717_ECO1L-GN"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "type": "bubble",
                            "hero": {
                              "type": "image",
                              "size": "full",
                              "aspectRatio": "20:13",
                              "aspectMode": "fit",
                              "url": "https://www.etungo.com.tw/files/TC_PSpec/PS_Pic/TM-516.jpg"
                            },
                            "body": {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "【DaHe】304不銹鋼多功能手持攪拌機",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl"
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "baseline",
                                      "contents": [
                                        {
                                          "type": "text",
                                          "text": "促銷價",
                                          "weight": "bold",
                                          "margin": "md",
                                          "color": "#e60412",
                                          "flex": 0
                                        },
                                        {
                                          "type": "text",
                                          "text": "$780",
                                          "weight": "bold",
                                          "size": "md",
                                          "align": "end",
                                          "color": "#e60412"
                                        }
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "text": ".強力馬達",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    }
                                  ]
                                }
                              ]
                            },
                            "footer": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "spacer",
                                  "size": "xxl"
                                },
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "color": "#e60412",
                                  "action": {
                                    "type": "uri",
                                    "label": "點擊查看",
                                    "uri": "https://www.etungo.com.tw/inside/377/723/735/25309.html?kw=LINE&utm_medium=Click&utm_campaign=20180717_TM516"
                                  }
                                }
                              ]
                            }
                          },
                          {
                            "type": "bubble",
                            "hero": {
                              "type": "image",
                              "size": "full",
                              "aspectRatio": "20:13",
                              "aspectMode": "fit",
                              "url": "https://www.etungo.com.tw/files/TC_PSpec/PS_Pic/CLT-25As.jpg"
                            },
                            "body": {
                              "type": "box",
                              "layout": "vertical",
                              "spacing": "sm",
                              "contents": [
                                {
                                  "type": "text",
                                  "text": "【ZANWA晶華】冷熱兩用電子冰箱",
                                  "wrap": true,
                                  "weight": "bold",
                                  "size": "xl"
                                },
                                {
                                  "type": "box",
                                  "layout": "vertical",
                                  "spacing": "sm",
                                  "contents": [
                                    {
                                      "type": "box",
                                      "layout": "baseline",
                                      "contents": [
                                        {
                                          "type": "text",
                                          "text": "促銷價",
                                          "weight": "bold",
                                          "margin": "md",
                                          "color": "#e60412",
                                          "flex": 0
                                        },
                                        {
                                          "type": "text",
                                          "text": "62折",
                                          "weight": "bold",
                                          "size": "md",
                                          "align": "end",
                                          "color": "#e60412"
                                        }
                                      ]
                                    },
                                    {
                                      "type": "text",
                                      "text": ".居家戶外皆可用",
                                      "wrap": true,
                                      "color": "#aaaaaa",
                                      "size": "xxs"
                                    }
                                  ]
                                }
                              ]
                            },
                            "footer": {
                              "type": "box",
                              "layout": "vertical",
                              "contents": [
                                {
                                  "type": "spacer",
                                  "size": "xxl"
                                },
                                {
                                  "type": "button",
                                  "style": "primary",
                                  "color": "#e60412",
                                  "action": {
                                    "type": "uri",
                                    "label": "點擊查看",
                                    "uri": "https://www.etungo.com.tw/inside/377/722/727/48351.html?kw=LINE&utm_medium=Click&utm_campaign=20180720_CLT-25A"
                                  }
                                }
                              ]
                            }
                          }
                        ]
                      }
                }
            ]
        };*/
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
    var message_string = "sourcetype:"+sourcetype+"\n" + "count:"+count+"\n" + "sid:"+sid+"\n" + "results_link:"+results_link+"\n" + "search_name:"+search_name+"\n" + "owner:"+owner+"\n" + "admin:"+admin;
    SendMessage("R230fdb328b23308c554983ab07a4543f", message_string, 'tstiisacompanyfortatung', "reply_token", function (ret) {
        if(ret){
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
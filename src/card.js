function querystring() {
  var href = "http://xxx?userhash=1f644a1b7da169d2b56e1a4c6da61fea \
                          &key1=answer&key2=agree&key3=thanks"
    // var href = window.location.href,
  var kv;
  var params = href.slice(href.indexOf('?') + 1).split('&');
  var qs = [];

  for (i = 0; i < params.length; i++) {
    kv = params[i].split('=');
    qs.push(kv[0]);
    qs[kv[0]] = kv[1];
  }
  return qs;
}

var qs = querystring();

var eng2ch = {
  "ask": "提问",
  "answer": "回答",
  "post": "文章",
  "agree": "赞同",
  "thanks": "感谢",
  "follower": "关注者"
};

(function(d) {
  var baseurl = 'http://localhost:8000/v1/user/',
    i;

  function store(key, value) {
    try {
      if (window.localStorage) {
        if (value) {
          value._timestamp = new Date().valueOf();
          localStorage[key] = JSON.stringify(value);
        } else {
          var ret = localStorage[key];
          if (ret) {
            return JSON.parse(ret);
          }
          return null;
        }
      }
    } catch (e) {}
  }

  function valueof() {

  }

  function template(data) {
    // 填充模版中的变量
    var t = d.getElementById('zhihu-card');
    var regex = /{([^}]+)}/g;
    var text = t.innerHTML;
    var m = text.match(regex);
    for (i = 0; i < m.length; i++) {
      // text = text.replace(m[i], valueof(data, m[i].slice(1, -1)));
      text = text.replace(m[i], data[m[i].slice(1, -1)]);
    }
    return text;
  }

  function request(url, callback) {
    var cache = store(url);
    if (cache && cache._timestamp) {
      // cache for 6 hours, set to 21600 in production
      if (new Date().valueOf() - cache._timestamp < 1) {
        return callback(cache);
      }
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      callback(JSON.parse(xhr.response));
    };
    xhr.send();
  }

  function linky() {
    // 填充card links
  }

  function zhihuCard(userhash) {

    var url = baseurl + userhash;
    request(url, function(data) {

      data = data || {};
      var defaults = '?'; // 默认显示的字符
      // message 存在说明data没有获取到数据，不存储，用 cache里的数据
      if (typeof(data.name) == 'undefined') {
        data = store(url) || data;
      } else {
        store(url, data);
      }
      data.name = escape(data.name);
      var key1 = qs.key1,
        key2 = qs.key2,
        key3 = qs.key3
      data['key1_data'] = numberic(data[key1]) || defaults
      data['key2_data'] = numberic(data[key2]) || defaults
      data['key3_data'] = numberic(data[key3]) || defaults
      data['key1'] = eng2ch[key1]
      data['key2'] = eng2ch[key2]
      data['key3'] = eng2ch[key3]

      var card = d.createElement('div');
      card.className = 'zhihu-card';
      card.innerHTML = template(data);
      // linky(card);
      console.log(data)
      console.log(card)
    });
  }

  function numberic(num) {
    if (num == null || typeof(num) == "undefined") return null;
    if (num < 10000) {
      return num.toString();
    }
    num = num / 1000;
    return num.toFixed(0) + 'k';
  }

  zhihuCard(qs.userhash);

  function escape(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})(document);
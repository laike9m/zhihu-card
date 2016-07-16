function querystring() {
  var href = window.location.href,
    kv;
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

(function(d) {
  var apiUrl = 'http://localhost:8000/v1/user/',
    userUrl = "https://www.zhihu.com/people/",
    i;
  var eng2ch = {
    "ask": "提问",
    "answer": "回答",
    "post": "文章",
    "agree": "赞同",
    "thanks": "感谢",
    "follower": "关注者"
  };
  var eng2path = {
    "ask": "asks",
    "answer": "answers",
    "post": "posts",
    "agree": "",
    "thanks": "",
    "follower": "followers"
  };

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

  function valueof() {}

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
      // cache for 6 hours
      if (new Date().valueOf() - cache._timestamp < 21600000) {
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

  function linky(card) {
    // 填充 target, set iframe height
    var links = card.getElementsByTagName('a');
    for (i = 0; i < links.length; i++) {
      (function(link) {
        link.target = '_' + (qs.target || 'blank');
      })(links[i]);
    }
    d.body.appendChild(card);
    if (qs.description == 'no') {
      var des = d.getElementsByClassName('footer')[0];
      if (des) {
        des.setAttribute('style', 'display:none');
      }
    }
    if (qs.button == 'no') {
      var btn = d.getElementsByClassName('button')[0];
      btn.parentNode.removeChild(btn);
    }
    d.body.className = 'ready';
    if (parent !== self && parent.postMessage) {
      var height = Math.max(
        d.body.scrollHeight,
        d.documentElement.scrollHeight,
        d.body.offsetHeight,
        d.documentElement.offsetHeight,
        d.body.clientHeight,
        d.documentElement.clientHeight
      );
      parent.postMessage({
        height: height,
        sender: qs.identity || '*'
      }, '*');
    }
  }

  function zhihuCard(userhash) {
    var url = apiUrl + userhash;
    request(url, function(data) {
      data = data || {};
      var defaults = '?'; // 默认显示的字符
      // message 存在说明data没有获取到数据，不存储，用 cache里的数据
      if (typeof(data.name) == 'undefined') {
        data = store(url) || data;
      } else {
        store(url, data);
      }
      var key1 = qs.key1,
        key2 = qs.key2,
        key3 = qs.key3;
      data['key1_data'] = numberic(data[key1]) || defaults;
      data['key2_data'] = numberic(data[key2]) || defaults;
      data['key3_data'] = numberic(data[key3]) || defaults;
      data['key1'] = eng2ch[key1];
      data['key2'] = eng2ch[key2];
      data['key3'] = eng2ch[key3];
      data['key1_url'] = userUrl + data.domain + '/' + eng2path[key1];
      data['key2_url'] = userUrl + data.domain + '/' + eng2path[key2];
      data['key3_url'] = userUrl + data.domain + '/' + eng2path[key3];
      data.avatar = data.avatar.replace('https', 'http');
      data.avatar = data.avatar.replace('_l', '_m');

      var card = d.createElement('div');
      card.className = 'zhihu-card';
      card.innerHTML = template(data);
      linky(card);
    });
  }

  function numberic(num) {
    if (num == null || typeof(num) == "undefined") return null;
    if (num < 10000) {
      return num.toString();
    }
    num = parseInt(num / 1000);
    return num.toFixed(0) + 'k';
  }

  var noreferrer = d.createElement('meta');
  noreferrer.name = "referrer";
  noreferrer.content = "no-referrer";
  d.head.appendChild(noreferrer);
  zhihuCard(qs.userhash);

  function escape(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})(document);
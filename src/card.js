function querystring() {
  var href = "http://xxx?userhash=1f644a1b7da169d2b56e1a4c6da61fea \
                          &key1=Answer&key2=Agree&key3=Thanks"
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

  function template() {
    // 填充模版中的变量
  }

  function request(url, callback) {
    var cache = store(url);
    if (cache && cache._timestamp) {
      // cache for 6 hours
      if (new Date().valueOf() - cache._timestamp < 21600) {
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
      if (typeof(data.Name) == 'undefined') {
        data = store(url) || data;
      } else {
        store(url, data);
      }
      data.Name = escape(data.Name);
      var key1 = qs.key1,
        key2 = qs.key2,
        key3 = qs.key3
      data[key1] = numberic(data[key1]) || defaults
      data[key2] = numberic(data[key2]) || defaults
      data[key3] = numberic(data[key3]) || defaults

      var card = d.createElement('div');
      card.className = 'zhihu-card';
      // card.innerHTML = template('user', data);
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

  zhihuCard(qs.userhash)

  function escape(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
})(document)
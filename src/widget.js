(function(d) {
  var base = window.laike9mdev ? "" : "replacethis";
  var i, count = 0;
  var client_url, client_id, client_secret, client_theme;

  function queryclass(name) {
    if (d.querySelectorAll) {
      return d.querySelectorAll('.' + name);
    }
    var elements = d.getElementsByTagName('div');
    var ret = [];
    for (i = 0; i < elements.length; i++) {
      if (~elements[i].className.split(' ').indexOf(name)) {
        ret.push(elements[i]);
      }
    }
    return ret;
  }

  function querydata(element, name) {
    return element.getAttribute('data-' + name);
  }

  function heighty(iframe) {
    if (window.addEventListener) {
      window.addEventListener('message', function(e) {
        if (iframe.id === e.data.sender) {
          iframe.height = e.data.height;
        }
      }, false);
    }
  }

  function render(card) {
    var theme = querydata(card, 'theme') || 'zhihu';
    cardurl = base + 'theme/' + theme + '.html';
    var userhash = querydata(card, 'userhash');
    if (!userhash) {
      return;
    }
    count += 1;
    var width = querydata(card, 'width');
    var height = querydata(card, 'height');
    var key1 = querydata(card, 'key1') || 'answer';
    var key2 = querydata(card, 'key2') || 'agree';
    var key3 = querydata(card, 'key3') || 'follower';
    var button = querydata(card, 'button') || "yes";
    var description = querydata(card, 'description') || "yes";
    var identity = 'zhcard-' + userhash + '-' + count;

    var iframe = d.createElement('iframe');
    iframe.setAttribute('id', identity);
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('scrolling', 0);
    iframe.setAttribute('allowtransparency', true);

    var url = cardurl + '?userhash=' + userhash + '&identity=' + identity + "&button=" + button + "&description=" + description;
    url += '&key1=' + key1 + '&key2=' + key2 + '&key3=' + key3;
    iframe.src = url;
    iframe.width = width || Math.min(card.parentNode.clientWidth || 400, 400);
    if (height) {
      iframe.height = height;
    }
    heighty(iframe);
    card.parentNode.replaceChild(iframe, card);
    return iframe;
  }

  var cards = queryclass('zhihu-card');
  for (i = 0; i < cards.length; i++) {
    render(cards[i]);
  }
})(document);
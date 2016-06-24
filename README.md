# zhihu-card

[(Eng ver.)](#english-version)  
用卡片展示你的知乎账户：  
<img src="https://raw.githubusercontent.com/laike9m/zhihu-card/master/images/chenghao.png" width="500px">

## 使用

```html
<div class="zhihu-card" data-userhash="1f644a1b7da169d2b56e1a4c6da61fea"></div>
<script src="//cdn.jsdelivr.net/zhihu-card/latest/widget.js"></script>
```
注意 `widget.js` 一定要放在 `<div>` 的后面。

其它可用的 `data-xx` 参数包括:
* `width`: 卡片宽度，默认值是 400
* `height`: 卡片高度
* `key1`, `key2`, `key3`: 卡片的三栏中显示数值的类型，取值和含义如下：

    | 取值     | 含义       |
    |----------|------------|
    | ask      | 提问数量   |
    | answer   | 回答数量   |
    | post     | 文章数量   |
    | agree    | 赞同数量   |
    | thanks   | 感谢数量   |
    | follower | 关注者数量 |
    默认值 `key1=answer, key2=agree, key3=follower`
    
### 获取 userhash
在个人主页里（比如 https://www.zhihu.com/people/laike9m ），打开页面调试工具，搜索 `user_hash`，结果如下图所示:

<img src="https://raw.githubusercontent.com/laike9m/zhihu-card/master/images/userhash.png" width="600px">

## 例子
```html
<div class="zhihu-card" data-userhash="1f644a1b7da169d2b56e1a4c6da61fea"
    data-width="400" data-height="300" data-key1="answer" data-key2="agree" data-key3="post"></div>
<script src="//cdn.jsdelivr.net/zhihu-card/latest/widget.js"></script>
```

## Mixed Content 
由于后端 API 是非 HTTPS 的，在 HTTPS 网站上使用时会引发 [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) 警告。虽然一般也没什么问题，毕竟个人主页一般不会包含敏感信息。

想彻底解决只能买域名+证书，由于我不想备案所以不打算做。不知道有没有好心人赞助个备案过的域名……

# English Version

Card to show your profile on [zhihu.com](https://www.zhihu.com/).

## Usage

```html
<div class="zhihu-card" data-userhash="6487fb46d752cc83f9a5eebf2134ed1c"></div>
<script src="//cdn.jsdelivr.net/zhihu-card/latest/widget.js"></script>
```
Make sure to place `widget.js` behind/under `<div>`.

Available data parameters are:
* `width`: card width, default is 400
* `height`: card height
* `key1`, `key2`, `key3`: control values displayed in three columns, available values and their meaning are shown below:

    | value     | meaning       |
    |----------|------------|
    | ask      | number of questions   |
    | answer   | number of answers   |
    | post     | number of posts  |
    | agree    | number of agree   |
    | thanks   | number of thanks   |
    | follower | number of followers |
    default: `key1=answer, key2=agree, key3=follower`

## Example
```html
<div class="zhihu-card" data-userhash="1f644a1b7da169d2b56e1a4c6da61fea"
    data-width="400" data-height="300" data-key1="answer" data-key2="agree" data-key3="post"></div>
<script src="//cdn.jsdelivr.net/zhihu-card/latest/widget.js"></script>
```

## Where to find your userhash
Go to your profile page, for me it's https://www.zhihu.com/people/laike9m. Inspect this page and search for `user_hash`. See example below:

<img src="https://raw.githubusercontent.com/laike9m/zhihu-card/master/images/userhash.png" width="600px">

## 致谢
特别感谢 @lepture 和他的 [github-cards](https://github.com/lepture/github-cards) 库。zhihu-card 的前端部分完全是照着 github-cards 写的。

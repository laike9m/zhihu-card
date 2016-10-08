#!/usr/bin/env python

import re
import os
import json
from os import path
from subprocess import Popen, PIPE

os.chdir(path.dirname(path.abspath(__file__)))

GA = '''
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-69544114-2', 'auto');
ga('send', 'pageview');
'''

def tinyhtml(text):
    lines = re.split('(<[^>]+>)', text)
    rv = []
    for line in lines:
        line = line.strip()
        rv.append(line)
    return ''.join(rv)


def shell(cmd, data=None):
    p = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    stdout, stderr = p.communicate(input=data)
    if not stdout:
        raise RuntimeError(stderr)
    return stdout


def create_card(theme):
    with open('src/theme/%s.html' % theme) as f:
        template = f.read()
        start = template.find('<script')
        end = template.find('</script>') + len('</script>')
        template = template[start:end]

    html = (
        '<!doctype html><html><body>'
        '<style type="text/css">%s</style>%s'
        '<script>%s</script>'
        '</body></html>'
    )

    css = shell(['cleancss', 'src/theme/%s.css' % theme])

    with open('src/card.js', 'rb') as f:
        content = f.read()
        # use real API url
        content = content.replace('http://localhost:8001', 'https://cr-inn.com')

    js = shell(['uglifyjs', '-m'], content)

    out = html % (css, tinyhtml(template), js)
    with open('jsdelivr/theme/%s.html' % theme, 'wb') as f:
        f.write(out)


def create_widget():
    with open('package.json') as f:
        pkg = json.load(f)

    url = '//cdn.jsdelivr.net/zhihu-card/%s/' % pkg['version']

    with open('src/widget.js') as f:
        content = f.read()
        content = content.replace('replacethis', url)

    js = shell(['uglifyjs', '-m'], content)
    with open('jsdelivr/widget.js', 'wb') as f:
        f.write(js)

create_widget()

if not os.path.isdir('jsdelivr/theme'):
    os.makedirs('jsdelivr/theme')

create_card('zhihu')
create_card('github')

        
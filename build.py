#!/usr/bin/env python3

import json
import os
import re
import sys
from os import path
from subprocess import PIPE, Popen

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
    if isinstance(data, str):
        data = data.encode('utf-8')
    stdout, stderr = p.communicate(input=data)
    if not stdout:
        raise RuntimeError(stderr)
    return stdout.decode('utf-8')


class GenFiles:

    def __init__(self):
        try:
            if sys.argv[1] == 'prodtest':
                print('Generting prodtest files...')
                self.mode = 'prodtest'
                self.output_dir = 'prodtest'
                self.version = 'master'
        except IndexError:
            print('Generting dist files...')
            self.mode = 'dist'
            self.output_dir = 'dist'
            with open('package.json') as f:
                self.version = json.load(f)['version']

    def create_card(self, theme):
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

        with open('src/card.js', 'r') as f:
            content = f.read()
            # use real API url
            content = content.replace(
                'http://localhost:8001', 'https://cr-inn.com')

        js = shell(['uglifyjs', '-m'], content)

        out = html % (css, tinyhtml(template), js)
        with open(f'{self.output_dir}/theme/%s.html' % theme, 'w') as f:
            f.write(out)

    def create_widget(self):
        url = f'https://cdn.rawgit.com/laike9m/zhihu-card/{self.version}/'

        with open('src/widget.js') as f:
            content = f.read()
            content = content.replace('replacethis', url)

        js = shell(['uglifyjs', '-m'], content)
        with open(f'{self.output_dir}/widget.js', 'w') as f:
            f.write(js)


def main():
    if not os.path.isdir('dist/theme'):
        os.makedirs('dist/theme')
    if not os.path.isdir('prodtest/theme'):
        os.makedirs('prodtest/theme')

    g = GenFiles()
    g.create_widget()
    g.create_card('zhihu')
    g.create_card('github')


if __name__ == '__main__':
    main()

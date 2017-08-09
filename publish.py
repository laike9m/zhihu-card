import json
import os
import re

import git


def update_readme_and_push():
    with open('package.json') as f:
        version = json.load(f)['version']
    # update README
    widget_url = (f'//cdn.rawgit.com/laike9m/zhihu-card/{version}'
                  '/dist/widget.js')
    widget_url_pattern = '//cdn.*/widget.js'
    with open('README.md', 'r+') as f:
        updated_content = re.sub(widget_url_pattern, widget_url, f.read())
        f.seek(0)
        f.write(updated_content)

    g = git.cmd.Git(os.getcwd())
    g.status()
    g.add('--all')
    g.commit('-a', m=f'bump version to {version}')
    g.tag(a=f'{version}', m=f'v{version}')
    g.push()


if __name__ == '__main__':
    update_readme_and_push()

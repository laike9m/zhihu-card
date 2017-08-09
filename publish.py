import json
import re

from build import shell


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

    print(shell(['git', 'status']))
    print(shell(['git', 'add', '--all']))
    print(shell(['git', 'commit', '-am',
                 f'bump version to {version}']))
    print(shell(['git', 'tag', '-a', f'{version}',
                 '-m', f'v{version}']))
    print(shell(['git', 'push']))


if __name__ == '__main__':
    update_readme_and_push()

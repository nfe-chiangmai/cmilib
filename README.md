# Princess Library Project

## Developer Set up
Requires Ruby
```
git clone git@github.com:nh758/princessLibraryProject.git princessLibraryProject
cd princessLibraryProject
bundle install
bundle exec jekyll serve
```

## Adding pages
1. Add .md or .html files with your content to the `pages` folder.
1. Edit `_/data/navigation.yml` to include the page in the navigation menu.

  ``` yml
  - name: My page
    link: /pages/myPage.html
```
Note: the link should always reference the file as `.html` because the `.md` files get converted to `.html` by Jekyll.

### Adding video content
The following include can be used to add a embed video:
{% raw %}
```
{% include video.html url="https://www.youtube.com/embed/C0DPdy98e4c/" description="this is just an example" %}
```
{% endraw %}

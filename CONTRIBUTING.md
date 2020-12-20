## Install master branch
```
npm install -g git+https://github.com/viasite/site-audit-seo.git --unsafe-perm
```

## docker-compose build
For build you should symlink `site-audit-seo-viewer` to `data/front` directory.

For me:

```
ln -s $HOME/projects/js/site-audit-seo-viewer $HOME/projects/site-audit-seo/data/front
```

Then:

```
docker-compose build
docker-compose up -d
```

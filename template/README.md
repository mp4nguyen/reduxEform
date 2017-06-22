# Mitsubishi corp website

## Install
1. [https://nodejs.org/en/](https://nodejs.org/en/)
2. [https://git-scm.com/](https://git-scm.com/)
3. [https://tortoisegit.org/](https://tortoisegit.org/)


## Quick Start using Command Line: Git

Clone this repo
```bash
Get clone at: https://bitbucket.org/dsproduction/p16011-mitsubishi-corpratewebsite.git
$ cd p16011-mitsubishi-corpratewebsite/src/html
```

Install dependencies
```bash
$ npm install
```

Start tasks for development
```bash
$ gulp dev
```

Open your web browser and navigate to [http://localhost:3001](http://localhost:3001)

---

## Directory Layout
    gulp/
      tasks/            --> Individual task files
      util/             --> Helpers
      config.js         --> File Src and dest configuration
    gulpfile.js
    package.json        --> For npm to install node modules
    public/             --> Static assets. Generated files are added here. No work should be done in  this directory

    source/
      assets/           --> Contents are compiled, minified, copied, etc.. to the public directory
        images/
        js/             --> Javascript files
        sass/           --> Sass files
      views/            --> Jade files
        blocks/         --> View blocks
        layouts/        --> Doctype, html, head, body template
        mixins/         --> View mixins
        *.jade          --> All page

---
## Delete node_modules
```bash
$ rimraf node-modules
```

## Setting Sublime Text
Menu > Preferences > Settings - User
```bash
{
  "draw_white_space": "all",
  "ensure_newline_at_eof_on_save": true,
  "extra_file_exclude_patterns":
  [
    "*.pyc",
    "*.pyo",
    "*.exe",
    "*.dll",
    "*.obj",
    "*.o",
    "*.a",
    "*.lib",
    "*.so",
    "*.dylib",
    "*.ncb",
    "*.sdf",
    "*.suo",
    "*.pdb",
    "*.idb",
    ".DS_Store",
    "*.class",
    "*.psd",
    "*.db",
    "*.sublime-workspace"
  ],
  "extra_folder_exclude_patterns":
  [
    ".svn",
    ".git",
    ".hg",
    "CVS",
    "node_modules/"
  ],
  "folder_exclude_patterns":
  [
    ".svn",
    ".git",
    ".hg",
    "CVS",
    "node_modules/"
  ],
  "font_size": 12,
  "highlight_line": true,
  "ignored_packages":
  [
    "Markdown",
    "Vintage"
  ],
  "tab_size": 2,
  "translate_tabs_to_spaces": true,
  "word_wrap": true
}

```
Clone this repo
```bash
Get clone at: https://bitbucket.org/dsproduction/p16011-mitsubishi-corpratewebsite.git
$ cd p16011-mitsubishi-corpratewebsite/src/html
```

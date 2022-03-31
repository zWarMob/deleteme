# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Local Development

```
$ npm start
```

### Build

```
$ npm build
```

generates static content into the `build` directory

```
📁 @site
 │
 ├──📁docs
 │   └──📁📄(folder/.md/.mdx structure of documentation)
 │
 ├──src
 │   └── 📁📄components (custom react components to import in .mdx)
 │   │
 │   └── 📁📄theme (swizzled components docusaurus.io/docs/swizzling)
 │
 ├──📁versioned_# (old documentation ver)
 └──📄versions.json (old documentation ver)
```

# TD
document tags / title (front matter)


versioning:
http://localhost:3000/docs/3.2.0/intro
http://localhost:3000/docs/intro

add language support: https://docusaurus.io/docs/markdown-features/code-blocks#supported-languages

interactive code editor

admonitions https://docusaurus.io/docs/markdown-features/admonitions

custom mdx and plugins to f.ex. show videos https://docusaurus.io/docs/markdown-features/plugins
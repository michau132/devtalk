# react-typescript-starter

> This is sample repository to quick jump to start coding in React.

React starter pack includes: 
+ React v 16.8.6
+ react-router
+ [`styled-components`](https://www.styled-components.com/docs)
+ [`babel`](https://babeljs.io/docs/en/index.html)
+ [`react-hot-loader`](http://gaearon.github.io/react-hot-loader/) - for faster development and also debugging code (see advance of react-hot-loader see [`this`](https://vimeo.com/100010922) video), it works only in development mode!
+ typescript with eslint ([`here`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules) u can find rules for project that is scaling typescript and eslint, it also use rules from [`tslint`](https://palantir.github.io/tslint/rules/) and [`eslint`](https://eslint.org/docs/rules/))
+ webpack customized for production and development environment, also you can add much more environments based on projects requirements. You can just add .env.YourEnvironmentName and define your environment variables (also remember to keep .env files in your .gitignore). Webpack was configured to only copy images, fonts, and other files. You need to put all your assets to folder <b>static</b> and to show for e.g. image in your site you put path <b>"dist/images/image.jpg"</b> (in source file there is exaple with code)



## Starting the development server

```shell
npm start
```

## Building the `bundle`

```shell
npm run build
```

## Type-Checking the repo

```shell
npm run type-check
```

And to run in --watch mode:

```shell
npm run type-check:watch
```

## Linting files at src folder

```shell
npm run lint
```

And to run in --fix mode:

```shell
npm run lint:fix
```

## License

MIT

# generator-megatran
A lightweight and barebone generator that uses NodeJS, ExpressJS and AngularJS. Has currently support for generating angular views and controllers. Also uses gulp with nodemon and browsersync.
> [Yeoman](http://yeoman.io) generator

## Getting Started

### What is Yeoman?
(http://yeoman.io)

### megatran generator
To install the megatran generator following command should be executed to install necessary packages and link them to yeomon.

```bash
npm install -g yo
npm install
npm link
```

Finally, initiate the generator in project folder:

```bash
yo megatran
```

Support for:

Angular.Views
```bash
yo megatran:views
```

Angular.Controllers
```bash
yo megatran:controllers
```

Default gulp runs nodemon and browser-sync:
```bash
gulp
```

## License

MIT


var assert = require('assert')
var AppRunner = require('./support/app-runner')
var exec = require('child_process').exec
var fs = require('fs')
var mkdirp = require('mkdirp')
var path = require('path')
var request = require('supertest')
var rimraf = require('rimraf')
var spawn = require('child_process').spawn
var tmp = require('tmp')
var utils = require('./support/utils')
var validateNpmName = require('validate-npm-package-name')

var APP_START_STOP_TIMEOUT = 5000
var PKG_PATH = path.resolve(__dirname, '..', 'package.json')
var BIN_PATH = path.resolve(path.dirname(PKG_PATH), require(PKG_PATH).bin.express)
var NPM_INSTALL_TIMEOUT = 60000
var TEMP_DIR = tmp.dirSync().name

describe('express(1)', function () {
  after(function (done) {
    this.timeout(30000)
    rimraf(TEMP_DIR, done)
  })

  describe('(no args)', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app', function (done) {
      runRaw(ctx.dir, [], function (err, code, stdout, stderr) {
        if (err) return done(err)
        ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
        ctx.stderr = stderr
        ctx.stdout = stdout
        assert.equal(ctx.files.length, 15)
        done()
      })
    })

    it('should provide debug instructions', function () {
      assert.ok(/DEBUG=express-1-no-args:\* (?:& )?npm start/.test(ctx.stdout))
    })

    it('should have basic files', function () {
      assert.notEqual(ctx.files.indexOf('bin/www'), -1)
      assert.notEqual(ctx.files.indexOf('app.js'), -1)
      assert.notEqual(ctx.files.indexOf('package.json'), -1)
    })

    it('should have a package.json file', function () {
      var file = path.resolve(ctx.dir, 'package.json')
      var contents = fs.readFileSync(file, 'utf8')
      assert.equal(contents, '{\n' +
        '  "name": "express-1-no-args",\n' +
        '  "version": "0.0.0",\n' +
        '  "private": true,\n' +
        '  "scripts": {\n' +
        '    "start": "node ./bin/www"\n' +
        '  },\n' +
        '  "dependencies": {\n' +
        '    "cookie-parser": "~1.4.3",\n' +
        '    "debug": "~2.6.9",\n' +
        '    "ejs": "~2.5.7",\n' +
        '    "express": "~4.16.0",\n' +
        '    "http-errors": "~1.6.2",\n' +
        '    "morgan": "~1.9.0"\n' +
        '  }\n' +
        '}\n')
    })

    it('should have installable dependencies', function (done) {
      this.timeout(NPM_INSTALL_TIMEOUT)
      npmInstall(ctx.dir, done)
    })

    it('should export an express app from app.js', function () {
      var file = path.resolve(ctx.dir, 'app.js')
      var app = require(file)
      assert.equal(typeof app, 'function')
      assert.equal(typeof app.handle, 'function')
    })

    describe('npm start', function () {
      before('start app', function () {
        this.app = new AppRunner(ctx.dir)
      })

      after('stop app', function (done) {
        this.timeout(APP_START_STOP_TIMEOUT)
        this.app.stop(done)
      })

      it('should start app', function (done) {
        this.timeout(APP_START_STOP_TIMEOUT)
        this.app.start(done)
      })

      it('should respond to HTTP request', function (done) {
        request(this.app)
          .get('/')
          .expect(200, /<title>Express<\/title>/, done)
      })

      it('should generate a 404', function (done) {
        request(this.app)
          .get('/does_not_exist')
          .expect(404, /<h1>Not Found<\/h1>/, done)
      })
    })

    describe('when directory contains spaces', function () {
      var ctx0 = setupTestEnvironment('foo bar (BAZ!)')

      it('should create basic app', function (done) {
        run(ctx0.dir, [], function (err, output) {
          if (err) return done(err)
          assert.equal(utils.parseCreatedFiles(output, ctx0.dir).length, 15)
          done()
        })
      })

      it('should have a valid npm package name', function () {
        var file = path.resolve(ctx0.dir, 'package.json')
        var contents = fs.readFileSync(file, 'utf8')
        var name = JSON.parse(contents).name
        assert.ok(validateNpmName(name).validForNewPackages, 'package name "' + name + '" is valid')
        assert.equal(name, 'foo-bar-baz')
      })
    })

    describe('when directory is not a valid name', function () {
      var ctx1 = setupTestEnvironment('_')

      it('should create basic app', function (done) {
        run(ctx1.dir, [], function (err, output) {
          if (err) return done(err)
          assert.equal(utils.parseCreatedFiles(output, ctx1.dir).length, 15)
          done()
        })
      })

      it('should default to name "hello-world"', function () {
        var file = path.resolve(ctx1.dir, 'package.json')
        var contents = fs.readFileSync(file, 'utf8')
        var name = JSON.parse(contents).name
        assert.ok(validateNpmName(name).validForNewPackages)
        assert.equal(name, 'hello-world')
      })
    })
  })

  describe('(unknown args)', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should exit with code 1', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
        assert.strictEqual(code, 1)
        done()
      })
    })

    it('should print usage', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
        assert.ok(/Usage: express /.test(stdout))
        assert.ok(/--help/.test(stdout))
        assert.ok(/--version/.test(stdout))
        assert.ok(/error: unknown option/.test(stderr))
        done()
      })
    })

    it('should print unknown option', function (done) {
      runRaw(ctx.dir, ['--foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
        assert.ok(/error: unknown option/.test(stderr))
        done()
      })
    })
  })

  describe('<dir>', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app in directory', function (done) {
      runRaw(ctx.dir, ['foo'], function (err, code, stdout, stderr) {
        if (err) return done(err)
        ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
        ctx.stderr = stderr
        ctx.stdout = stdout
        assert.equal(ctx.files.length, 16)
        done()
      })
    })

    it('should provide change directory instructions', function () {
      assert.ok(/cd foo/.test(ctx.stdout))
    })

    it('should provide install instructions', function () {
      assert.ok(/npm install/.test(ctx.stdout))
    })

    it('should provide debug instructions', function () {
      assert.ok(/DEBUG=foo:\* (?:& )?npm start/.test(ctx.stdout))
    })

    it('should have basic files', function () {
      assert.notEqual(ctx.files.indexOf('foo/bin/www'), -1)
      assert.notEqual(ctx.files.indexOf('foo/app.js'), -1)
      assert.notEqual(ctx.files.indexOf('foo/package.json'), -1)
    })

    it('should have ejs templates', function () {
      assert.notEqual(ctx.files.indexOf('foo/views/error.ejs'), -1)
      assert.notEqual(ctx.files.indexOf('foo/views/index.ejs'), -1)
    })
  })

  describe('--css <engine>', function () {
    describe('(no engine)', function () {
      var ctx = setupTestEnvironment(this.fullTitle())

      it('should exit with code 1', function (done) {
        runRaw(ctx.dir, ['--css'], function (err, code, stdout, stderr) {
          if (err) return done(err)
          assert.strictEqual(code, 1)
          done()
        })
      })

      it('should print usage', function (done) {
        runRaw(ctx.dir, ['--css'], function (err, code, stdout) {
          if (err) return done(err)
          assert.ok(/Usage: express /.test(stdout))
          assert.ok(/--help/.test(stdout))
          assert.ok(/--version/.test(stdout))
          done()
        })
      })

      it('should print argument missing', function (done) {
        runRaw(ctx.dir, ['--css'], function (err, code, stdout, stderr) {
          if (err) return done(err)
          assert.ok(/error: option .* argument missing/.test(stderr))
          done()
        })
      })
    })

    describe('less', function () {
      var ctx = setupTestEnvironment(this.fullTitle())

      it('should create basic app with less files', function (done) {
        run(ctx.dir, ['--css', 'less'], function (err, stdout) {
          if (err) return done(err)
          ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
          assert.equal(ctx.files.length, 15, 'should have 15 files')
          done()
        })
      })

      it('should have basic files', function () {
        assert.notEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
        assert.notEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
        assert.notEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
      })

      it('should have less files', function () {
        assert.notEqual(ctx.files.indexOf('public/stylesheets/style.less'), -1, 'should have style.less file')
      })

      it('should have installable dependencies', function (done) {
        this.timeout(NPM_INSTALL_TIMEOUT)
        npmInstall(ctx.dir, done)
      })

      describe('npm start', function () {
        before('start app', function () {
          this.app = new AppRunner(ctx.dir)
        })

        after('stop app', function (done) {
          this.timeout(APP_START_STOP_TIMEOUT)
          this.app.stop(done)
        })

        it('should start app', function (done) {
          this.timeout(APP_START_STOP_TIMEOUT)
          this.app.start(done)
        })

        it('should respond to HTTP request', function (done) {
          request(this.app)
            .get('/')
            .expect(200, /<title>Express<\/title>/, done)
        })

        it('should respond with stylesheet', function (done) {
          request(this.app)
            .get('/stylesheets/style.css')
            .expect(200, /sans-serif/, done)
        })
      })
    })
  })

  describe('--ejs', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with ejs templates', function (done) {
      run(ctx.dir, ['--ejs'], function (err, stdout) {
        if (err) return done(err)
        ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
        assert.equal(ctx.files.length, 15, 'should have 15 files')
        done()
      })
    })

    it('should have basic files', function () {
      assert.notEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
      assert.notEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
      assert.notEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
    })

    it('should have ejs templates', function () {
      assert.notEqual(ctx.files.indexOf('views/error.ejs'), -1, 'should have views/error.ejs file')
      assert.notEqual(ctx.files.indexOf('views/index.ejs'), -1, 'should have views/index.ejs file')
    })
  })

  describe('--git', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app with git files', function (done) {
      run(ctx.dir, ['--git'], function (err, stdout) {
        if (err) return done(err)
        ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
        assert.equal(ctx.files.length, 16, 'should have 16 files')
        done()
      })
    })

    it('should have basic files', function () {
      assert.notEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
      assert.notEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
      assert.notEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
    })

    it('should have .gitignore', function () {
      assert.notEqual(ctx.files.indexOf('.gitignore'), -1, 'should have .gitignore file')
    })

    it('should have ejs templates', function () {
      assert.notEqual(ctx.files.indexOf('views/error.ejs'), -1)
      assert.notEqual(ctx.files.indexOf('views/index.ejs'), -1)
    })
  })

  describe('-h', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should print usage', function (done) {
      run(ctx.dir, ['-h'], function (err, stdout) {
        if (err) return done(err)
        var files = utils.parseCreatedFiles(stdout, ctx.dir)
        assert.equal(files.length, 0)
        assert.ok(/Usage: express /.test(stdout))
        assert.ok(/--help/.test(stdout))
        assert.ok(/--version/.test(stdout))
        done()
      })
    })
  })

  describe('--help', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should print usage', function (done) {
      run(ctx.dir, ['--help'], function (err, stdout) {
        if (err) return done(err)
        var files = utils.parseCreatedFiles(stdout, ctx.dir)
        assert.equal(files.length, 0)
        assert.ok(/Usage: express /.test(stdout))
        assert.ok(/--help/.test(stdout))
        assert.ok(/--version/.test(stdout))
        done()
      })
    })
  })

  describe('--no-view', function () {
    var ctx = setupTestEnvironment(this.fullTitle())

    it('should create basic app without view engine', function (done) {
      run(ctx.dir, ['--no-view'], function (err, stdout) {
        if (err) return done(err)
        ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
        assert.equal(ctx.files.length, 13)
        done()
      })
    })

    it('should have basic files', function () {
      assert.notEqual(ctx.files.indexOf('bin/www'), -1)
      assert.notEqual(ctx.files.indexOf('app.js'), -1)
      assert.notEqual(ctx.files.indexOf('package.json'), -1)
    })

    it('should not have views directory', function () {
      assert.equal(ctx.files.indexOf('views'), -1)
    })

    it('should have installable dependencies', function (done) {
      this.timeout(NPM_INSTALL_TIMEOUT)
      npmInstall(ctx.dir, done)
    })

    describe('npm start', function () {
      before('start app', function () {
        this.app = new AppRunner(ctx.dir)
      })

      after('stop app', function (done) {
        this.timeout(APP_START_STOP_TIMEOUT)
        this.app.stop(done)
      })

      it('should start app', function (done) {
        this.timeout(APP_START_STOP_TIMEOUT)
        this.app.start(done)
      })

      it('should respond to HTTP request', function (done) {
        request(this.app)
          .get('/')
          .expect(200, /<title>Express<\/title>/, done)
      })

      it('should generate a 404', function (done) {
        request(this.app)
          .get('/does_not_exist')
          .expect(404, /Cannot GET \/does_not_exist/, done)
      })
    })
  })

  describe('--view <engine>', function () {
    describe('(no engine)', function () {
      var ctx = setupTestEnvironment(this.fullTitle())

      it('should exit with code 1', function (done) {
        runRaw(ctx.dir, ['--view'], function (err, code, stdout, stderr) {
          if (err) return done(err)
          assert.strictEqual(code, 1)
          done()
        })
      })

      it('should print usage', function (done) {
        runRaw(ctx.dir, ['--view'], function (err, code, stdout) {
          if (err) return done(err)
          assert.ok(/Usage: express /.test(stdout))
          assert.ok(/--help/.test(stdout))
          assert.ok(/--version/.test(stdout))
          done()
        })
      })

      it('should print argument missing', function (done) {
        runRaw(ctx.dir, ['--view'], function (err, code, stdout, stderr) {
          if (err) return done(err)
          assert.ok(/error: option .* argument missing/.test(stderr))
          done()
        })
      })
    })

    describe('ejs', function () {
      var ctx = setupTestEnvironment(this.fullTitle())

      it('should create basic app with ejs templates', function (done) {
        run(ctx.dir, ['--view', 'ejs'], function (err, stdout) {
          if (err) return done(err)
          ctx.files = utils.parseCreatedFiles(stdout, ctx.dir)
          assert.equal(ctx.files.length, 15, 'should have 15 files')
          done()
        })
      })

      it('should have basic files', function () {
        assert.notEqual(ctx.files.indexOf('bin/www'), -1, 'should have bin/www file')
        assert.notEqual(ctx.files.indexOf('app.js'), -1, 'should have app.js file')
        assert.notEqual(ctx.files.indexOf('package.json'), -1, 'should have package.json file')
      })

      it('should have ejs templates', function () {
        assert.notEqual(ctx.files.indexOf('views/error.ejs'), -1, 'should have views/error.ejs file')
        assert.notEqual(ctx.files.indexOf('views/index.ejs'), -1, 'should have views/index.ejs file')
      })

      it('should have installable dependencies', function (done) {
        this.timeout(NPM_INSTALL_TIMEOUT)
        npmInstall(ctx.dir, done)
      })

      describe('npm start', function () {
        before('start app', function () {
          this.app = new AppRunner(ctx.dir)
        })

        after('stop app', function (done) {
          this.timeout(APP_START_STOP_TIMEOUT)
          this.app.stop(done)
        })

        it('should start app', function (done) {
          this.timeout(APP_START_STOP_TIMEOUT)
          this.app.start(done)
        })

        it('should respond to HTTP request', function (done) {
          request(this.app)
            .get('/')
            .expect(200, /<title>Express<\/title>/, done)
        })

        it('should generate a 404', function (done) {
          request(this.app)
            .get('/does_not_exist')
            .expect(404, /<h1>Not Found<\/h1>/, done)
        })
      })
    })
  })
})

function npmInstall (dir, callback) {
  var env = utils.childEnvironment()

  exec('npm install', { cwd: dir, env: env }, function (err, stderr) {
    if (err) {
      err.message += stderr
      callback(err)
      return
    }

    callback()
  })
}

function run (dir, args, callback) {
  runRaw(dir, args, function (err, code, stdout, stderr) {
    if (err) {
      return callback(err)
    }

    process.stderr.write(utils.stripWarnings(stderr))

    try {
      assert.equal(utils.stripWarnings(stderr), '')
      assert.strictEqual(code, 0)
    } catch (e) {
      return callback(e)
    }

    callback(null, utils.stripColors(stdout))
  })
}

function runRaw (dir, args, callback) {
  var argv = [BIN_PATH].concat(args)
  var binp = process.argv[0]
  var stderr = ''
  var stdout = ''

  var child = spawn(binp, argv, {
    cwd: dir
  })

  child.stdout.setEncoding('utf8')
  child.stdout.on('data', function ondata (str) {
    stdout += str
  })
  child.stderr.setEncoding('utf8')
  child.stderr.on('data', function ondata (str) {
    stderr += str
  })

  child.on('close', onclose)
  child.on('error', callback)

  function onclose (code) {
    callback(null, code, stdout, stderr)
  }
}

function setupTestEnvironment (name) {
  var ctx = {}

  before('create environment', function (done) {
    ctx.dir = path.join(TEMP_DIR, name.replace(/[<>]/g, ''))
    mkdirp(ctx.dir, done)
  })

  after('cleanup environment', function (done) {
    this.timeout(30000)
    rimraf(ctx.dir, done)
  })

  return ctx
}

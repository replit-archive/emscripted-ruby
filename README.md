Emscripted-Ruby
===============

Emscripted Ruby is a build script that uses [Emscripten](https://github.com/kripken/emscripten)
to compile Ruby MRI 1.8.7 for use in a browser. The main difference is the
conversion from C to C++ and the switch from setjmp/longjmp (which can't be
implemented in JavaScript) to C++ exceptions. Note that we are not using
Ruby 1.9.x due to its reliance on threads, which cannot be ported directly
using Emscripten.

The project is fairly young. Right now it suffers from a memory leak due to a
bug in the emscripting of the Ruby garbage collector. The performance is also
a problem, as so far we've enabled runtime checking of all signing and overflow
issues. Switching to just the needed sign/overflow corrections should boost
performance significantly.

The build script is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
The modifications follow Ruby's GNU GPL2 license.

How to Build
------------

The latest pre-built files are found in the `dist` folder:

* `ruby.js` is the raw human-readable compiled source produced by Emscripten.
* `ruby.opt.js` is the human-readable compiled source after being passed
  through the redundant variable elimination script.
* `ruby.closure.js` is `ruby.opt.js` after being passed through the Closure
  Compiler. This is what you will likely want to use.
* `lib` is the folder containing the Ruby standard library. You will want to
  copy this alongside one of the above JavaScript files to your app.

If you want to build it manually, run `./makeruby`. If you want to use the
Closure Compiler, you will need to check out and build a recent version, then
provide the path to it in `makeruby`. That script also contains a few
configurable options. You might need to tweak `RELOOP`, `PREINITIALIZED_MEMORY`
and `RUN_CLOSURE` until you get optimal performance in all your target browsers.

For the manual build, you will need to have Emscripten and Emmaken configured
as per the Emscripten documentation.

How to Use
----------

Copy one of the three JavaScript files from `dist` to a place accessible to your
web page, along with the whole `lib` folder. In your app, include the JavaScript
file you copied. This will provide a global variable called `Ruby`. All your
interactions with Emscripted Ruby goes through that. The functions it offers are
as follows:

* `initialize(input, output, error)`: This will initialize the Ruby engine and
  should be called once before any calls to `eval()` or `stringify()`. The
  arguments are 3 optional callbacks:
  * `input`: Will be called when Ruby asks for something on `stdin`. Should
    return an ASCII character code or  `null` if no more input is available.
    Defaults to `readline()` in a command-line engine and `window.prompt()`
    in a browser.
  * `output`: Will be called when Ruby prints something to `stdout` and passed
    a byte value which might be an ASCII character code or part of a UTF8
    character. Its return value is ignored.
  * `error`: Same as `output`, but for `stderr`.
* `eval(string)`: Evaluates the given Ruby code and returns the result as a Ruby
  object. Currently there is no JavaScript API to tinker with this object other
  than `stringify()`, but you can use all the C API functions if you really
  want. Their names are prefixed with underscore in JavaScript though. Read the
  Emscripten docs for some hints about the marshalling required to convert to
  and from C types.
* `stringify(object)`: Converts an object returned by `eval()` to a
  human-readable string representation (equivalent of `object.to_s()`).

Note that including the JavaScript file directly into your web page will pull a
huge number of Emscripten-generated globals into the global namespace, so you
might want to put it in an iframe or a Web Worker. We can't simply wrap the code
in an anonymous closure because that significantly reduces performance.

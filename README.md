Emscripted-Ruby
===============

Emscripted Ruby is a build script that uses [Emscripten](https://github.com/kripken/emscripten)
to compile Ruby MRI 1.8.7 for use in a browser. The main difference is the
conversion from C to C++ and the switch from setjmp/longjmp (which can't be
implemented in JavaScript) to C++ exceptions.

The project is fairly young. Right now it suffers from a memory leak due to a
bug in the emscripting of the Ruby garbage collector. The performance is also
a problem, as so far we've enabled runtime checking of all signing and overflow
issues. Switching to just the needed sign/overflow corrections should boost
performance significantly.

The build script is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
The modifications follow Ruby's GNU GPL2 license.

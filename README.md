Emscripted-Ruby
===============

Emscripted Ruby is a build script that uses [Emscripten](https://github.com/kripken/emscripten)
to compile Ruby MRI 1.8.7 for use in a browser. The main difference is the
conversion from C to C++ and the switch from setjmp/longjmp (which can't be
implemented in JavaScript) to C++ exceptions.

The project is in its infancy. Right now it suffers from a crash due to an
LLVM's miscompilation of the Ruby garbage collector, and have numerous
deficiencies, especially in handling Bignums.

The build script is licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).
The modifications follow Ruby's GNU GPL2 license.

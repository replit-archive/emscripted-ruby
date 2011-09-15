this['Ruby'] = {
  // Initializes the Ruby runtime with optional standard I/O callbacks.
  'initialize': function(input, output, error) {
    if (this.isInitialized) {
      console.log('Ignoring repeated Ruby initialization.');
      return;
    }
    FS.init(input, output, error);
    run();

    // Wheee, infinite stack!
    var variable_in_this_stack_frame = allocate(4, 'i32', ALLOC_STACK);
    _ruby_init_stack(variable_in_this_stack_frame);
    // The Ruby garbage collector is currently incompatible with Emscripten, so
    // we disable it completely. This causes memory leaks, but prevents crashes.
    // TODO: Get the garbage collector to work (maybe stack direction issues?).
    //       Requires #define C_ALLOCA 1 for a start (garbage_collect llvm bug).
    _rb_gc_disable();
    _rb_gc_enable = function () { return 0; };
    _ruby_stack_check = function () { return 0; };

    _ruby_init();
    var includeStr = Ruby.allocateString('.');
    __ZL12push_includePKc(includeStr);
    _free(includeStr);
    this.isInitialized = true;
  },
  // Evaluates a Ruby expression and returns the result.
  'eval': function(command) {
    if (!this.isInitialized) throw new Error('Ruby runtime not initialized.');
    var commandPtr = this.allocateString(command);
    var result = _rb_eval_string(commandPtr);
    _free(commandPtr);
    return result;
  },
  // Converts a Ruby value to a string representation (inspect method).
  'stringify': function(value) {
    var ptr = allocate([_rb_inspect(value),0,0,0], ['i32',0,0,0], ALLOC_NORMAL);
    var str = Pointer_stringify(_rb_string_value_ptr(ptr));
    _free(ptr);
    return str;
  },
  isInitialized: false,
  allocateString: function(str) {
    return allocate(intArrayFromString(str), 'i8', ALLOC_NORMAL);
  }
};

var types = {
  arr:  ['bucket1', 'bucket2', 'bucket3'],
  bool: true,
  func: function() {},
  num:  1234567890,
  obj:  { key: 'value' },
  str:  'Hello World',
  und:  undefined
};

test('Array', function() {
  var func = fu(
  	['Array'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.arr), 'Expects Array type');

  throws(function() {
  	func(types.bool);
  }, Error, 'Throws error if type is Boolean');

  throws(function() {
  	func(types.func);
  }, Error, 'Throws error if type is Function');

  throws(function() {
  	func(types.num);
  }, Error, 'Throws error if type is Number');

  throws(function() {
  	func(types.obj);
  }, Error, 'Throws error if type is Object');

  throws(function() {
  	func(types.str);
  }, Error, 'Throws error if type is String');
});

test('Boolean', function() {
  var func = fu(
  	['Boolean'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.bool), 'Expects Boolean type');

  throws(function() {
  	func(types.arr);
  }, Error, 'Throws error if type is Array');

  throws(function() {
  	func(types.func);
  }, Error, 'Throws error if type is Function');

  throws(function() {
  	func(types.num);
  }, Error, 'Throws error if type is Number');

  throws(function() {
  	func(types.obj);
  }, Error, 'Throws error if type is Object');

  throws(function() {
  	func(types.str);
  }, Error, 'Throws error if type is String');
});

test('Function', function() {
  var func = fu(
  	['Function'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.func), 'Expects valid Function type');

  throws(function() {
  	func(types.arr);
  }, Error, 'Throws error if type is Array');

  throws(function() {
  	func(types.bool);
  }, Error, 'Throws error if type is Boolean');

  throws(function() {
  	func(types.num);
  }, Error, 'Throws error if type is Number');

  throws(function() {
  	func(types.obj);
  }, Error, 'Throws error if type is Object');

  throws(function() {
  	func(types.str);
  }, Error, 'Throws error if type is String');
});

test('Number', function() {
  var func = fu(
  	['Number'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.num), 'Expects valid Number type');

  throws(function() {
  	func(types.arr);
  }, Error, 'Throws error if type is Array');

  throws(function() {
  	func(types.bool);
  }, Error, 'Throws error if type is Boolean');

  throws(function() {
  	func(types.func);
  }, Error, 'Throws error if type is Function');

  throws(function() {
  	func(types.obj);
  }, Error, 'Throws error if type is Object');

  throws(function() {
  	func(types.str);
  }, Error, 'Throws error if type is String');
});

test('Object', function() {
  var func = fu(
  	['Object'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.obj), 'Expects valid Object type');

  throws(function() {
  	func(types.arr);
  }, Error, 'Throws error if type is Array');

  throws(function() {
  	func(types.bool);
  }, Error, 'Throws error if type is Boolean');

  throws(function() {
  	func(types.func);
  }, Error, 'Throws error if type is Function');

  throws(function() {
  	func(types.num);
  }, Error, 'Throws error if type is Number');

  throws(function() {
  	func(types.str);
  }, Error, 'Throws error if type is String');
});

test('String', function() {
  var func = fu(
  	['String'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.str), 'Expects valid String type');

  throws(function() {
  	func(types.arr);
  }, Error, 'Throws error if type is Array');

  throws(function() {
  	func(types.bool);
  }, Error, 'Throws error if type is Boolean');

  throws(function() {
  	func(types.func);
  }, Error, 'Throws error if type is Function');

  throws(function() {
  	func(types.num);
  }, Error, 'Throws error if type is Number');

  throws(function() {
  	func(types.obj);
  }, Error, 'Throws error if type is Object');
});

test('Wildcard', function() {
  var func = fu(
  	['*'],
  	function(arg) {
  		return true;
  	}
  );

  ok(func(types.arr),  'Expects valid data type for Array');
  ok(func(types.bool), 'Expects valid data type for Boolean');
  ok(func(types.func), 'Expects valid data type for Function');
  ok(func(types.num),  'Expects valid data type for Number');
  ok(func(types.obj),  'Expects valid data type for Object');
  ok(func(types.str),  'Expects valid data type for String');
  ok(func(types.und),  'Expects valid data type for undefined');
});

test('Multiple arguments', function() {
  var func = fu(
  	['Array', 'Boolean', 'Function', 'Number', 'Object', 'String'],
  	function(arg1, arg2, arg3, arg4, arg5, arg6) {
  		return true;
  	}
  );

  ok(func(types.arr, types.bool, types.func, types.num, types.obj, types.str), 'Arguments are of valid type');
});

test('Conditional types', function() {
  var func = fu(
  	['Array|String', 'String|Number', 'Object|undefined'],
  	function(arg1, arg2, arg3) {
  		return true;
  	}
  );

  ok(func(types.arr, types.str, types.und), 'Arguments are of valid type');

  throws(function() {
  	func(types.num, types.und, types.arr)
  }, Error, 'Throws error if type does not match conditions');
});

/**
 *  DataType-FU
 *  Create JavaScript functions with built-in argument type detection
 *
 *  Copyright 2014, Marc S. Brooks (http://mbrooks.info)
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/mit-license.php
 */

(function(uck) {
	var _self = {};

	/**
	 * Function for validating declared Function arguments data types
	 * @param {Array} types
	 * @param {Function} func
	 * @returns {Function}
	 */
	uck.fu = function(types, func) {
		if (!types instanceof Array) {
			throw new Error('Must be an Array of valid JavaScript types');
		}

		if (!func instanceof Function) {
			throw new Error('Must be a Function equal to the types length');
		}

		var _func = func;

		// type check function arguments
		func = function() {
			for (var i = 0; i < arguments.length; i++) {
				var argv = arguments[i],
					val  = types[i];

				if (typeof val !== 'string') {
					throw new Error('Data type ' + val + ' must be a String');
				}

				// support conditional types
				var conds = val.split(/\|/),
					error = null;

				for (var j = 0; j < conds.length; j++) {
					var type = conds[j];

					if (!/^array|boolean|function|number|object|string|undefined|\*$/i.test(type)) {
						throw new Error('Invalid data type ' + type);
					}

					var method;

					if (type == 'undefined') {
						method = 'isUndef';
					}
					else 
					if (type == '*') {
						method = 'isWildcard';
					}
					else {
						method = 'is' + _self.ucFirst(type);
					}

					if (_self[method](argv) !== true) {
						error = type;
					}
					else {
						error = null;
						break;
					}
				}

				if (error) {
					throw new Error('Argument "' + _self.parseFuncArgs(_func)[i] + '" value of type ' + _self.getDataType(argv) + ' is not valid.\n\n' +
 error + ' expected in:\n' + _self.parseFuncReformat(_func));
				}
			}

			return _func.apply(this, arguments);
		};

		return func;
	};

	/**
	 * Check for Array data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isArray = function() {
		return (Object.prototype.toString.call(arguments[0]) === '[object Array]');
	};

	/**
	 * Check for Boolean data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isBoolean = function() {
		return (typeof arguments[0] === 'boolean');
	};

	/**
	 * Check for Function data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isFunction = function() {
		return (Object.prototype.toString.call(arguments[0]) === '[object Function]');
	};

	/**
	 * Check for Number data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isNumber = function() {
		return (typeof arguments[0] === 'number');
	};

	/**
	 * Check for Object data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isObject = function() {
		return (Object.prototype.toString.call(arguments[0]) === '[object Object]');
	};

	/**
	 * Check for String data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isString = function() {
		return (typeof arguments[0] === 'string');
	};

	/**
	 * Check for undefined data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isUndef = function() {
		return (typeof arguments[0] === 'undefined');
	};

	/**
	 * Check for String data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isWildcard = function() {
		return (_self.getDataType(arguments[0])) ? true : false;
	};

	/**
	 * Return type for a given argument value
	 * @param {*}
	 * @returns {String}
	 */
	_self.getDataType = function() {
		var argv = arguments[0],
			type = null;

		if (_self.isArray   (argv)) { type = 'Array';     }
		if (_self.isBoolean (argv)) { type = 'Boolean';   }
		if (_self.isFunction(argv)) { type = 'Function';  }
		if (_self.isNumber  (argv)) { type = 'Number';    }
		if (_self.isObject  (argv)) { type = 'Object';    }
		if (_self.isString  (argv)) { type = 'String';    }
		if (_self.isUndef   (argv)) { type = 'undefined'; }

		return type;
	};

	/**
	 * Return function arguments names as array
	 * @param {Function}
	 * @returns {Array}
	 */
	_self.parseFuncArgs = function() {
		return String(arguments[0]).split('\n')[0].replace(/function\s\((.+)\)\s{/, '$1').split(/\s?,\s?/);
	};

	/**
	 * Reformat a function as preserving code format
	 * @param {Function}
	 * @returns {String}
	 */
	_self.parseFuncReformat = function() {
		var lines = String(arguments[0]).split('\n'),
			str   = "";

		for (var i = 0; i< lines.length; i++) {
			str += '\t' + lines[i] + '\n';
		}

		return str;
	};

	/**
	 * Uppercase the first letter in a string
	 * @param {String} str
	 * @returns {String}
	 */
	_self.ucFirst = function(str) {
		return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
	};
})

// support web browsers and node
((typeof module !== 'undefined' && module.exports) ? module.exports : window);

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
					type = _self.ucFirst(types[i]);

				if (typeof type !== 'string') {
					throw new Error('Data type ' + type + ' must be a String');
				}

				if (!/^Array|Boolean|Function|Number|Object|String|\*$/.test(type)) {
					throw new Error('Invalid data type ' + type);
				}

				type = (type == '*') ? 'Wildcard' : type;

				if (_self['is' + type](argv) !== true) {
					throw new Error('Argument type ' + type + ' for "' + argv + '" is not valid in\n' + _func);
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
		var type = null;

		if (_self.isArray   (arguments[0])) { type = 'Array';     }
		if (_self.isBoolean (arguments[0])) { type = 'Boolean';   }
		if (_self.isFunction(arguments[0])) { type = 'Function';  }
		if (_self.isNumber  (arguments[0])) { type = 'Number';    }
		if (_self.isObject  (arguments[0])) { type = 'Object';    }
		if (_self.isString  (arguments[0])) { type = 'String';    }
		if (_self.isUndef   (arguments[0])) { type = 'undefined'; }

		return type;
	};

	/**
	 * Uppercase the first letter in a string
	 * @param {String} str
	 * @returns {String}
	 */
	_self.ucFirst = function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
})

// support web browsers and node
((typeof module !== 'undefined' && module.exports) ? module.exports : window);

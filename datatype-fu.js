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
			throw(new Error('Must be an Array of valid JavaScript types'));
		}

		if (!func instanceof Function) {
			throw(new Error('Must be a Function equal to the types length'));
		}

		var _func = func;

		// type check function arguments
		func = function() {
			for (var i = 0; i < arguments.length; i++) {
				var argv  = arguments[i],
					type  = null,
					error = null;

				for (var j = 0; j < types.length; j++) {
					type = _self.ucFirst(types[j]);

					if (typeof type !== 'string') {
						throw(new Error('Data type ' + type + ' must be a String'));
					}

					if (!/^Array|Boolean|Function|Number|Object|String$/.test(type)) {
						throw(new Error('Invalid data type ' + type));
					}

					if (_self['is' + type](argv) === true) {
						error = null;
						break;
					}
					else {
						error = true;
					}
				}

				if (error) {
					throw(new Error('Argument type ' + type + ' for "' + argv + '" is not valid in\n' + _func));
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
		return (arguments[0] instanceof Array);
	};

	/**
	 * Check for Boolean data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isBoolean = function() {
		return (typeof arguments[0] === 'boolean' || arguments[0] instanceof Boolean);
	};

	/**
	 * Check for Function data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isFunction = function() {
		return (typeof arguments[0] === 'function' || arguments[0] instanceof Function);
	};

	/**
	 * Check for Object data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isObject = function() {
		return (typeof arguments[0] === 'object' || arguments[0] instanceof Object);
	};

	/**
	 * Check for Number data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isNumber = function() {
		return (typeof arguments[0] === 'number' || arguments[0] instanceof Number);
	};

	/**
	 * Check for String data type
	 * @param {*}
	 * @returns {Boolean}
	 */
	_self.isString = function() {
		return (typeof arguments[0] === 'string' || arguments[0] instanceof String);
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

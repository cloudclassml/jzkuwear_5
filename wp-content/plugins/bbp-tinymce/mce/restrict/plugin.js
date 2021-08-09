(function() {

	var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}
	// Used when there is no 'main' module.
	// The name is probably (hopefully) unique so minification removes for releases.
	var register_3795 = function(id) {
		var module = dem(id);
		var fragments = id.split('.');
		var target = Function('return this;')();
		for (var i = 0; i < fragments.length - 1; ++i) {
			if (target[fragments[i]] === undefined) target[fragments[i]] = {};
			target = target[fragments[i]];
		}
		target[fragments[fragments.length - 1]] = module;
	};

	var instantiate = function(id) {
		var actual = defs[id];
		var dependencies = actual.deps;
		var definition = actual.defn;
		var len = dependencies.length;
		var instances = new Array(len);
		for (var i = 0; i < len; ++i) instances[i] = dem(dependencies[i]);
		var defResult = definition.apply(null, instances);
		if (defResult === undefined) throw 'module [' + id + '] returned undefined';
		actual.instance = defResult;
	};

	var def = function(id, dependencies, definition) {
		if (typeof id !== 'string') throw 'module id must be a string';
		else if (dependencies === undefined) throw 'no dependencies for ' + id;
		else if (definition === undefined) throw 'no definition function for ' + id;
		defs[id] = {
			deps: dependencies,
			defn: definition,
			instance: undefined
		};
	};

	var dem = function(id) {
		var actual = defs[id];
		if (actual === undefined) throw 'module [' + id + '] was undefined';
		else if (actual.instance === undefined) instantiate(id);
		return actual.instance;
	};

	var req = function(ids, callback) {
		var len = ids.length;
		var instances = new Array(len);
		for (var i = 0; i < len; ++i) instances.push(dem(ids[i]));
		callback.apply(null, callback);
	};

	var ephox = {};
	ephox.bolt = {
		module: {
			api: {
				define: def,
				require: req,
				demand: dem,
			}
		}
	};

	var define = def;
	var require = req;
	var demand = dem;
	// this helps with minificiation when using a lot of global references
	var defineGlobal = function(id, ref) {
		define(id, [],
		function() {
			return ref;
		});
	};
	/*jsc
["tinymce.plugins.restrict.Plugin","tinymce.core.PluginManager","global!tinymce.util.Tools.resolve"]
jsc*/
	defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
	/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

	define('tinymce.core.PluginManager', ['global!tinymce.util.Tools.resolve'],
	function(resolve) {
		return resolve('tinymce.PluginManager');
	});

	/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

	/**
 * This class contains all core logic for the restrict plugin.
 *
 * @class tinymce.restrict.Plugin
 * @private
 */
	define('tinymce.plugins.restrict.Plugin', ['tinymce.core.PluginManager'],
	function(PluginManager) {
		PluginManager.add('restrict',
		function(editor) {
			// Add a button that opens a window
			editor.addButton('restrict', {
				icon: false,
				text: '👁️',
				tooltip: '登录可见',
				onclick: function() {
					editor.insertContent('<p>[restrict]</p>');

					editor.insertContent("<p>要展示的内容</p>");

					editor.insertContent('<p>[/restrict]</p>');

				}

			});

		});

		return function() {};
	});
	dem('tinymce.plugins.restrict.Plugin')();
})();
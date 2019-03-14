/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n    constructor(elements) {\n        this.elements = elements;\n    }\n    html(str) {\n        if (str) {\n            this.elements.forEach((node) => {\n                node.innerHTML = str;\n            });\n        } else {\n            return this.elements[0].innerHTML;\n        }\n    }\n    empty() {\n        this.elements.forEach((node => {\n            node.innerHTML = \"\";\n        }));\n    }\n    append(args) {\n        if (args instanceof DOMNodeCollection) {\n            args.elements.forEach( appending => {\n                this.elements.forEach ( receiving => {\n                    receiving.innerHTML = receiving.innerHTML.concat(appending.outerHTML);\n                });\n            });\n        }\n\n        // HTML el\n        if (args instanceof HTMLElement) {\n            this.elements.forEach( receiving => {\n                receiving.innerHTML = receiving.innerHTML.concat(args.outerHTML);\n            });\n        }\n\n\n        // string\n        if (typeof args === \"string\") {\n            this.elements.forEach( receiving => {\n                receiving.innerHTML = receiving.innerHTML.concat(args);\n            });\n        }\n    }\n\n    attr(key, value) {\n        if (value) {\n            this.elements.forEach ( elements => elements.setAttribute(key, value) );\n        } else {\n            return this.elements[0].getAttribute(key);\n        }\n\n    }\n\n    addClass(className) {\n        this.elements.forEach( element => {\n            element.classList.add(className);\n        });\n    }\n\n    removeClass(className) {\n        this.elements.forEach( element => {\n            element.classList.remove(className);\n        });\n    }\n\n    children() {\n        let childrenArray = [];\n        this.elements.forEach( element => {\n            childrenArray = childrenArray.concat([...element.children]);\n        });\n        return new DOMNodeCollection([...childrenArray]);\n    }\n\n    parent() {\n        let parentArray = [];\n        this.elements.forEach( element => {\n            parentArray = parentArray.concat([element.parentElement]);\n        });\n        return new DOMNodeCollection([...new Set(parentArray)]);\n    }\n\n    find(selector) {\n        let matchArray = [];\n        this.elements.forEach( element => {\n            matchArray = matchArray.concat([...element.querySelectorAll(selector)]);\n        });\n        return new DOMNodeCollection([...matchArray]);\n    }\n\n    remove() {\n        this.elements.forEach (element => {\n            element.remove();\n        });\n    }\n\n    on(event, callback) {\n        this.elements.forEach( element => {\n            element.addEventListener(event, callback);\n            element[`${event}`] = callback;\n        });\n    }\n\n    off(event) {\n        this.elements.forEach( element => {\n            element.removeEventListener(event, element[`${event}`]);\n            delete element[`${event}`];\n        });\n    }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n// debugger\nconst cbQueue = [];\n\n// window.state = false;\n\n// function setState() {\n//   window.state = true;\n//   runCBs();  \n// }\n\n// function runCBs() {\n//     if (window.state) {  \n//         while (cbQueue.length > 0) {\n//             cbQueue.shift()();\n//         }\n//     }\n// }\n\nfunction runCBs() {\n    while (cbQueue.length > 0) {\n        cbQueue.shift()();\n    }\n}\n\nlet loaded = false; \n\n// window.addEventListener('DOMContentLoaded', runCBs());\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    // debugger\n    cbQueue.forEach( fx => fx() );\n});\n\n// jquery dom ready callback\n// $(() => {\n//     alert('something');\n// });\n\n\nfunction $1() {\n    const args = Array.from(arguments);\n    for (let i =0; i < args.length; i++) {\n        let query = args[i];\n        if (query instanceof Function) {\n            cbQueue.push(query);\n        } else if (query instanceof HTMLElement) {\n            return new DOMNodeCollection([query]);\n        } else {\n            const nodeList = document.querySelectorAll(query);\n            const nodeArray = Array.from(nodeList);\n            return new DOMNodeCollection(nodeArray);\n        }\n    }\n}\n\n$1.extend = function(...objs) {\n    let resultObj = {};\n    objs.forEach(obj => {\n        Object.keys(obj).forEach(key => {\n            resultObj[key] = obj[key];\n        });\n    });\n    return resultObj;\n};\n\n$1.ajax = function(opts) {\n    const defaultOptions = { method: \"GET\", url: window.location.href, \n        contentType: \"application/json\", data: {}, success: response => console.log(response), \n        error: response => console.log(response) };\n\n    const options = $1.extend(defaultOptions, opts);\n\n    const Http = new XMLHttpRequest();\n    Http.onload = function() {\n        options.success(JSON.parse(Http.response));\n        \n    };\n    Http.onerror = function(options) {\n        console.log('error');\n        options.error(JSON.parse(Http.response));\n    };\n    Http.open(options.method, options.url);\n    Http.send();\n};\n\nwindow.$1 = $1;\n\n\n$1( () => {\n   return () => alert('test');\n}, () => {\n    console.log('your cat!');\n});\n\n\n// window.addEventListener('load' && 'DomContentLoaded')\n// window.onload = () => { catz }\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
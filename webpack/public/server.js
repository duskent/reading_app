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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _transliteration = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
// Slugify
// Schema


var bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  finished: { type: Boolean, default: false },
  slug: { type: String },
  categories: [{ name: { type: String, required: true } }]
});

// Do not change to es6 arrow function
bookSchema.pre('save', function (next) {
  if (this.author) {
    this.slug = (0, _transliteration.slugify)(this.author) + '-' + (0, _transliteration.slugify)(this.title);
  } else {
    this.slug = (0, _transliteration.slugify)(this.title);
  }

  next();
});

bookSchema.pre('findOneAndUpdate', function (next) {
  var _id = this._conditions._id;
  var slug = (0, _transliteration.slugify)(this._update.author) + '-' + (0, _transliteration.slugify)(this._update.title);

  this.findOneAndUpdate({ _id: _id }, { slug: slug });
  next();
});

exports.default = _mongoose2.default.model('Book', bookSchema);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _transliteration = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
// Slugify
// Schema


var categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String }
});

// Do not change to es6 arrow function

categorySchema.pre('save', function (next) {
  this.slug = (0, _transliteration.slugify)(this.name);
  next();
});

categorySchema.pre('findOneAndUpdate', function (next) {
  var _id = this._conditions._id;
  var slug = (0, _transliteration.slugify)(this._update.name);

  this.findOneAndUpdate({ _id: _id }, { slug: slug });
  next();
});

exports.default = _mongoose2.default.model('Category', categorySchema);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookCategoryType = __webpack_require__(19);

var _BookCategoryType2 = _interopRequireDefault(_BookCategoryType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// GraphQLTypes


var CategoryType = new _graphql.GraphQLObjectType({
  name: 'Category',
  description: 'Category of book',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        description: 'Mongo ObjectID'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'Name of the category'
      },
      slug: {
        type: _graphql.GraphQLString,
        description: 'Category slug'
      },
      books: {
        name: 'CategoryBook',
        type: new _graphql.GraphQLList(_BookCategoryType2.default),
        description: 'Books included in this catagory',
        resolve: function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
            var name;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    name = source.name;
                    _context.next = 3;
                    return _Book2.default.find({ 'categories.name': name });

                  case 3:
                    return _context.abrupt('return', _context.sent);

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function resolve(_x) {
            return _ref.apply(this, arguments);
          };
        }()
      }
    };
  }
});

exports.default = CategoryType;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _graphql = __webpack_require__(0);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BookType = new _graphql.GraphQLObjectType({
  name: 'Book',
  description: 'Book item',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString, description: 'Mongo ObjectID' },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString), description: 'Book title' },
      author: { type: _graphql.GraphQLString, description: 'Book\'s author' },
      finished: { type: _graphql.GraphQLBoolean, description: 'Represents reading status of book' },
      slug: { type: _graphql.GraphQLString, description: 'Book\'s slug' },
      categories: {
        type: new _graphql.GraphQLList(_CategoryType2.default),
        description: 'Categories in which current book belongs',
        resolve: function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
            var categoryNames;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    categoryNames = source.categories.map(function (c) {
                      return c.name;
                    });
                    _context.next = 3;
                    return _Category2.default.find({ name: { $in: categoryNames } });

                  case 3:
                    return _context.abrupt('return', _context.sent);

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function resolve(_x) {
            return _ref.apply(this, arguments);
          };
        }()
      }
    };
  }
});

exports.default = BookType;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var CategoryInputType = new _graphql.GraphQLInputObjectType({
  name: 'CategoryInput',
  description: 'Input category with parameters',
  fields: function fields() {
    return {
      name: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Name of the category'
      }
    };
  }
});

exports.default = CategoryInputType;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("transliteration");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var Message = new _graphql.GraphQLObjectType({
  name: 'Message',
  description: 'Returing message type',
  fields: {
    message: { type: _graphql.GraphQLString }
  }
});

exports.default = Message;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _CategoryInputType = __webpack_require__(5);

var _CategoryInputType2 = _interopRequireDefault(_CategoryInputType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookInputType = new _graphql.GraphQLInputObjectType({
  name: 'BookInput',
  description: 'Book input item',
  fields: function fields() {
    return {
      title: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Book title'
      },
      author: { type: _graphql.GraphQLString, description: 'Book\'s author' },
      finished: { type: _graphql.GraphQLBoolean, description: 'Represents reading status of book' },
      categories: {
        type: new _graphql.GraphQLList(_CategoryInputType2.default),
        description: 'Categories in which current book belongs'
      }
    };
  }
});

exports.default = BookInputType;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(12);
module.exports = __webpack_require__(13);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(14);

var _path2 = _interopRequireDefault(_path);

var _graphql = __webpack_require__(15);

var _graphql2 = _interopRequireDefault(_graphql);

__webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialization

// graphql
// Express
var app = (0, _express2.default)();
// Middlewares

// DB
app.use(_graphql2.default);
app.use('/', _express2.default.static('public'));
app.get("*", function (req, res) {
  res.sendFile(_path2.default.resolve('public', 'index.html'));
});

app.listen(process.env.PORT, function () {
  console.log('Listening port ' + process.env.PORT); //eslint-disable-line
});

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = __webpack_require__(16);

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = __webpack_require__(17);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GraphQL schema
var app = (0, _express2.default)();

app.use('/graphql', (0, _expressGraphql2.default)(function (request) {
  return {
    schema: _schema2.default,
    context: request,
    pretty: true,
    graphiql: true
  };
}));

exports.default = app;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _getCategory = __webpack_require__(18);

var _getCategory2 = _interopRequireDefault(_getCategory);

var _getCategories = __webpack_require__(20);

var _getCategories2 = _interopRequireDefault(_getCategories);

var _createCategory = __webpack_require__(21);

var _createCategory2 = _interopRequireDefault(_createCategory);

var _updateCategory = __webpack_require__(22);

var _updateCategory2 = _interopRequireDefault(_updateCategory);

var _deleteCategory = __webpack_require__(23);

var _deleteCategory2 = _interopRequireDefault(_deleteCategory);

var _addBookToCategory = __webpack_require__(24);

var _addBookToCategory2 = _interopRequireDefault(_addBookToCategory);

var _removeBookFromCategory = __webpack_require__(25);

var _removeBookFromCategory2 = _interopRequireDefault(_removeBookFromCategory);

var _getBooks = __webpack_require__(26);

var _getBooks2 = _interopRequireDefault(_getBooks);

var _getBook = __webpack_require__(27);

var _getBook2 = _interopRequireDefault(_getBook);

var _createBook = __webpack_require__(28);

var _createBook2 = _interopRequireDefault(_createBook);

var _updateBook = __webpack_require__(29);

var _updateBook2 = _interopRequireDefault(_updateBook);

var _deleteBook = __webpack_require__(30);

var _deleteBook2 = _interopRequireDefault(_deleteBook);

var _addCategoryToBook = __webpack_require__(31);

var _addCategoryToBook2 = _interopRequireDefault(_addCategoryToBook);

var _removeCategoryFromBook = __webpack_require__(32);

var _removeCategoryFromBook2 = _interopRequireDefault(_removeCategoryFromBook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Categories
var Query = new _graphql.GraphQLObjectType({
  name: 'RootQuery',
  fields: Object.assign({}, _getCategory2.default, _getCategories2.default, _getBook2.default, _getBooks2.default)
});
// Books


var Mutation = new _graphql.GraphQLObjectType({
  name: 'RootMutation',
  fields: Object.assign({}, _createCategory2.default, _updateCategory2.default, _deleteCategory2.default, _addBookToCategory2.default, _removeBookFromCategory2.default, _createBook2.default, _updateBook2.default, _deleteBook2.default, _addCategoryToBook2.default, _removeCategoryFromBook2.default)
});

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var getCategory = {
  getCategory: {
    type: _CategoryType2.default,
    description: 'Fetch single category by ID',
    args: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString), description: 'Id of fetched category' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Category2.default.findOne({ _id: args.id });

              case 3:
                return _context.abrupt('return', _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);
                throw new Error('Could not find Category with id ' + args.id);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 6]]);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = getCategory;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var BookCategoryType = new _graphql.GraphQLObjectType({
  name: 'BookCategory',
  description: 'Book item',
  fields: function fields() {
    return {
      id: { type: _graphql.GraphQLString, description: 'Mongo ObjectID' },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString), description: 'Book title' },
      author: { type: _graphql.GraphQLString, description: 'Book\'s author' },
      finished: { type: _graphql.GraphQLBoolean, description: 'Represents reading status of book' },
      slug: { type: _graphql.GraphQLString, description: 'Book\'s slug' }
    };
  }
});

exports.default = BookCategoryType;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types


var getCategories = {
  getCategories: {
    type: new _graphql.GraphQLList(_CategoryType2.default),
    description: 'Gets list of all categories',
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Category2.default.find();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve() {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = getCategories;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

var _CategoryInputType = __webpack_require__(5);

var _CategoryInputType2 = _interopRequireDefault(_CategoryInputType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types


var createCategory = {
  createCategory: {
    type: _CategoryType2.default,
    description: 'Creates new category in the database',
    args: {
      category: { type: _CategoryInputType2.default, description: 'Input category' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Category2.default.create(args.category);

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = createCategory;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

var _CategoryInputType = __webpack_require__(5);

var _CategoryInputType2 = _interopRequireDefault(_CategoryInputType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var updateCategory = {
  updateCategory: {
    type: _CategoryType2.default,
    description: 'Updates category in the db',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the category you want to update'
      },
      category: { type: _CategoryInputType2.default, description: 'Input category' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var id, category;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id, category = args.category;
                _context.next = 3;
                return _Category2.default.findOneAndUpdate({ _id: id }, category, { new: true });

              case 3:
                return _context.abrupt('return', _context.sent);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = updateCategory;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _Message = __webpack_require__(9);

var _Message2 = _interopRequireDefault(_Message);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Types
var deleteCategory = {
  deleteCategory: {
    type: _Message2.default,
    description: 'Deletes category form database by Id',
    args: {
      id: { type: _graphql.GraphQLString, description: 'Id of category to delete' }
    },
    resolve: function resolve(source, args) {
      _Category2.default.deleteOne({ _id: args.id });

      return { message: 'success' };
    }
  }
};
// GraphQL
exports.default = deleteCategory;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var addBookToCategory = {
  addBookToCategory: {
    type: _CategoryType2.default,
    description: 'Adds new book to category by ID',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the category'
      },
      bookId: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the book'
      }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var id, bookId, category, newCategory, where, push;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id, bookId = args.bookId;
                _context.next = 3;
                return _Category2.default.findOne({ _id: id });

              case 3:
                category = _context.sent;
                newCategory = { name: category.name };
                where = { _id: bookId };
                push = { $push: { categories: newCategory } };
                _context.next = 9;
                return _Book2.default.findOneAndUpdate(where, push, { new: true });

              case 9:
                return _context.abrupt('return', category);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = addBookToCategory;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _Category = __webpack_require__(2);

var _Category2 = _interopRequireDefault(_Category);

var _CategoryType = __webpack_require__(3);

var _CategoryType2 = _interopRequireDefault(_CategoryType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var removeBookFromCategory = {
  removeBookFromCategory: {
    type: _CategoryType2.default,
    description: 'Adds new book to category by ID',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the category'
      },
      bookId: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the book'
      }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var id, bookId, category, newCategory, where, pull;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id, bookId = args.bookId;
                _context.next = 3;
                return _Category2.default.findOne({ _id: id });

              case 3:
                category = _context.sent;
                newCategory = { name: category.name };
                where = { _id: bookId };
                pull = { $pull: { categories: newCategory } };
                _context.next = 9;
                return _Book2.default.findOneAndUpdate(where, pull, { new: true });

              case 9:
                return _context.abrupt('return', category);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = removeBookFromCategory;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookType = __webpack_require__(4);

var _BookType2 = _interopRequireDefault(_BookType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var getBooks = {
  getBooks: {
    type: new _graphql.GraphQLList(_BookType2.default),
    description: 'Gets list of all books',
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Book2.default.find();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve() {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = getBooks;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookType = __webpack_require__(4);

var _BookType2 = _interopRequireDefault(_BookType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var getBook = {
  getBook: {
    type: _BookType2.default,
    description: 'Gets list of all books',
    args: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString), description: 'Id of fetched book' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _Book2.default.findOne({ _id: args.id });

              case 3:
                return _context.abrupt('return', _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);
                throw new Error('Could not find Book with id ' + args.id);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined, [[0, 6]]);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = getBook;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookType = __webpack_require__(4);

var _BookType2 = _interopRequireDefault(_BookType);

var _BookInputType = __webpack_require__(10);

var _BookInputType2 = _interopRequireDefault(_BookInputType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types


var createBook = {
  createBook: {
    type: _BookType2.default,
    description: 'Creates new book in the database',
    args: {
      book: { type: _BookInputType2.default, description: 'Book input object' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var book, newBook;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                book = args.book;
                _context.next = 3;
                return _Book2.default.create(book);

              case 3:
                newBook = _context.sent;
                return _context.abrupt('return', newBook);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = createBook;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookType = __webpack_require__(4);

var _BookType2 = _interopRequireDefault(_BookType);

var _BookInputType = __webpack_require__(10);

var _BookInputType2 = _interopRequireDefault(_BookInputType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var updateBook = {
  updateBook: {
    type: _BookType2.default,
    description: 'Updates book in the db',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the book you want to update'
      },
      book: { type: _BookInputType2.default, description: 'Input book' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var id, book, updatedBook;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id, book = args.book;
                _context.next = 3;
                return _Book2.default.findOneAndUpdate({ _id: id }, book, { new: true });

              case 3:
                updatedBook = _context.sent;
                return _context.abrupt('return', updatedBook);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

module.exports = updateBook;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _Message = __webpack_require__(9);

var _Message2 = _interopRequireDefault(_Message);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Types
var deleteBook = {
  deleteBook: {
    type: _Message2.default,
    description: 'Deletes Book form database by Id',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of book to delete'
      }
    },
    resolve: function resolve(source, args) {
      _Book2.default.deleteOne({ _id: args.id });

      return { message: 'success' };
    }
  }
};
// GraphQL
exports.default = deleteBook;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookType = __webpack_require__(4);

var _BookType2 = _interopRequireDefault(_BookType);

var _CategoryInputType = __webpack_require__(5);

var _CategoryInputType2 = _interopRequireDefault(_CategoryInputType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var addCategoryToBook = {
  addCategoryToBook: {
    type: _BookType2.default,
    description: 'Adds new category to book by ID',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the book'
      },
      category: { type: _CategoryInputType2.default, description: 'Inserted category' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var id, category, where, push, updatedBook;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id, category = args.category;
                where = { _id: id };
                push = { $push: { categories: category } };
                _context.next = 5;
                return _Book2.default.findOneAndUpdate(where, push, { new: true });

              case 5:
                updatedBook = _context.sent;
                return _context.abrupt('return', updatedBook);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = addCategoryToBook;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Book = __webpack_require__(1);

var _Book2 = _interopRequireDefault(_Book);

var _BookType = __webpack_require__(4);

var _BookType2 = _interopRequireDefault(_BookType);

var _CategoryInputType = __webpack_require__(5);

var _CategoryInputType2 = _interopRequireDefault(_CategoryInputType);

var _graphql = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// Types

// GraphQL


var removeCategoryFromBook = {
  removeCategoryFromBook: {
    type: _BookType2.default,
    description: 'Removes category from book ID',
    args: {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
        description: 'Id of the book'
      },
      category: { type: _CategoryInputType2.default, description: 'Removed category' }
    },
    resolve: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source, args) {
        var id, category, where, pull, updatedBook;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = args.id, category = args.category;
                where = { _id: id };
                pull = { $pull: { categories: category } };
                _context.next = 5;
                return _Book2.default.findOneAndUpdate(where, pull, { new: true });

              case 5:
                updatedBook = _context.sent;
                return _context.abrupt('return', updatedBook);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function resolve(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = removeCategoryFromBook;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = __webpack_require__(34);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = __webpack_require__(6);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();
// Mongoose connection

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(process.env.DATABASE_URL);

var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'connection error:')); //eslint-disable-line

exports.default = db;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map
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


// Schema
var mongoose = __webpack_require__(6);
var Schema = mongoose.Schema;
// Slugify

var _require = __webpack_require__(8),
    slugify = _require.slugify;

var bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  finished: { type: Boolean, default: false },
  slug: { type: String },
  categories: [{ name: { type: String, required: true } }]
});

bookSchema.pre('save', function (next) {
  if (this.author) {
    this.slug = slugify(this.author) + '-' + slugify(this.title);
  } else {
    this.slug = slugify(this.title);
  }

  next();
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Category = __webpack_require__(3);

var _require = __webpack_require__(0),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLInt = _require.GraphQLInt,
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLList = _require.GraphQLList;

var CategoryType = __webpack_require__(4);

var BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book item',
  fields: function fields() {
    return {
      id: { type: GraphQLString, description: 'Mongo ObjectID' },
      title: { type: new GraphQLNonNull(GraphQLString), description: 'Book title' },
      author: { type: GraphQLString, description: 'Book\'s author' },
      finished: { type: GraphQLBoolean, description: 'Represents reading status of book' },
      slug: { type: GraphQLString, description: 'Book\'s slug' },
      categories: {
        type: new GraphQLList(CategoryType),
        description: 'Categories in which current book belongs',
        resolve: function resolve(source, args) {
          var categoryNames = source.categories.map(function (c) {
            return c.name;
          });

          return new Promise(function (resolve, reject) {
            Category.find({ name: { $in: categoryNames } }, function (err, categories) {
              if (err) reject(err);else resolve(categories);
            });
          });
        }
      }
    };
  }
});

module.exports = BookType;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Schema
var mongoose = __webpack_require__(6);
var Schema = mongoose.Schema;
// Slugify

var _require = __webpack_require__(8),
    slugify = _require.slugify;

var categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String }
});

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// GraphQLTypes
var BookCategoryType = __webpack_require__(18);

var _require = __webpack_require__(0),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLInt = _require.GraphQLInt,
    GraphQLString = _require.GraphQLString,
    GraphQLList = _require.GraphQLList;

var CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'Category of book',
  fields: function fields() {
    return {
      id: {
        type: GraphQLString,
        description: 'Mongo ObjectID'
      },
      name: {
        type: GraphQLString,
        description: 'Name of the category'
      },
      slug: {
        type: GraphQLString,
        description: 'Category slug'
      },
      books: {
        name: 'CategoryBook',
        type: new GraphQLList(BookCategoryType),
        description: 'Books included in this catagory',
        resolve: function resolve(source, args) {
          return new Promise(function (resolve, reject) {
            var name = source.name;

            Book.find({ 'categories.name': name }, function (err, books) {
              if (err) reject(err);else resolve(books);
            });
          });
        }
      }
    };
  }
});

module.exports = CategoryType;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    GraphQLInt = _require.GraphQLInt,
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var CategoryInputType = new GraphQLInputObjectType({
  name: 'CategoryInput',
  description: 'Input category with parameters',
  fields: function fields() {
    return {
      name: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Name of the category'
      }
    };
  }
});

module.exports = CategoryInputType;

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


var _require = __webpack_require__(0),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString;

var Message = new GraphQLObjectType({
  name: 'Message',
  description: 'Returing message type',
  fields: {
    message: { type: GraphQLString }
  }
});

module.exports = Message;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    GraphQLInt = _require.GraphQLInt,
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLList = _require.GraphQLList;

var CategoryInputType = __webpack_require__(5);

var BookInputType = new GraphQLInputObjectType({
  name: 'BookInput',
  description: 'Book input item',
  fields: function fields() {
    return {
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Book title'
      },
      author: { type: GraphQLString, description: 'Book\'s author' },
      finished: { type: GraphQLBoolean, description: 'Represents reading status of book' },
      categories: {
        type: new GraphQLList(CategoryInputType),
        description: 'Categories in which current book belongs'
      }
    };
  }
});

module.exports = BookInputType;

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


// Express
var express = __webpack_require__(7);
var app = express();
// graphql
var graphql = __webpack_require__(14);
// DB
var db = __webpack_require__(33);
var Category = __webpack_require__(3);

app.use(graphql);

app.get('/', function (req, res) {
  Category.find({}, function (err, data) {
    if (err) throw err;
    res.json({
      categories: data
    });
  });
});

app.listen(3000, function () {
  console.log('Listening port 3000');
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var express = __webpack_require__(7);
var graphqlHTTP = __webpack_require__(15);

var Schema = __webpack_require__(16);
var app = express();

app.use('/graphql', graphqlHTTP(function (request) {
  return {
    schema: Schema,
    context: request,
    pretty: true,
    graphiql: true
  };
}));

module.exports = app;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLSchema = _require.GraphQLSchema;
// Categories


var getCategory = __webpack_require__(17);
var getCategories = __webpack_require__(19);
var createCategory = __webpack_require__(20);
var updateCategory = __webpack_require__(21);
var deleteCategory = __webpack_require__(22);
var addBookToCategory = __webpack_require__(23);
var removeBookFromCategory = __webpack_require__(24);
// Books
var getBooks = __webpack_require__(25);
var getBook = __webpack_require__(26);
var createBook = __webpack_require__(27);
var updateBook = __webpack_require__(28);
var deleteBook = __webpack_require__(29);
var addCategoryToBook = __webpack_require__(30);
var removeCategoryFromBook = __webpack_require__(31);
// Utils
var _ = __webpack_require__(32);

var Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: _.assign(getCategory, getCategories, getBook, getBooks)
});

var Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: _.assign(createCategory, updateCategory, deleteCategory, addBookToCategory, removeBookFromCategory, createBook, updateBook, deleteBook, addCategoryToBook, removeCategoryFromBook)
});

var Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Category = __webpack_require__(3);
// Types
var CategoryType = __webpack_require__(4);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var getCategory = {
  getCategory: {
    type: CategoryType,
    description: 'Fetch single category by ID',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString), description: 'Id of fetched category' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id;


        Category.findOne({ _id: id }, function (err, category) {
          if (err) reject(err);else resolve(category);
        });
      });
    }
  }
};

module.exports = getCategory;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean;

var BookCategoryType = new GraphQLObjectType({
  name: 'BookCategory',
  description: 'Book item',
  fields: function fields() {
    return {
      id: { type: GraphQLString, description: 'Mongo ObjectID' },
      title: { type: new GraphQLNonNull(GraphQLString), description: 'Book title' },
      author: { type: GraphQLString, description: 'Book\'s author' },
      finished: { type: GraphQLBoolean, description: 'Represents reading status of book' },
      slug: { type: GraphQLString, description: 'Book\'s slug' }
    };
  }
});

module.exports = BookCategoryType;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CategoryType = __webpack_require__(4);

var _require = __webpack_require__(0),
    GraphQLList = _require.GraphQLList;

var Category = __webpack_require__(3);

var getCategories = {
  getCategories: {
    type: new GraphQLList(CategoryType),
    description: 'Gets list of all categories',
    resolve: function resolve() {
      return new Promise(function (resolve, reject) {
        Category.find(function (err, categories) {
          if (err) reject(err);else resolve(categories);
        });
      });
    }
  }
};

module.exports = getCategories;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Category = __webpack_require__(3);
// Types
var CategoryType = __webpack_require__(4);
var CategoryInputType = __webpack_require__(5);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString;

var createCategory = {
  createCategory: {
    type: CategoryType,
    description: 'Creates new category in the database',
    args: {
      category: { type: CategoryInputType, description: 'Input category' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var category = args.category;


        Category.create(category, function (err, newCategory) {
          if (err) reject(err);else resolve(newCategory);
        });
      });
    }
  }
};

module.exports = createCategory;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Category = __webpack_require__(3);
// Types
var CategoryType = __webpack_require__(4);
var CategoryInputType = __webpack_require__(5);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var updateCategory = {
  updateCategory: {
    type: CategoryType,
    description: 'Updates category in the db',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the category you want to update'
      },
      category: { type: CategoryInputType, description: 'Input category' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id,
            category = args.category;


        Category.findOneAndUpdate({ _id: id }, category, { new: true }, function (err, updatedCategory) {
          if (err) reject(err);else resolve(updatedCategory);
        });
      });
    }
  }
};

module.exports = updateCategory;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Category = __webpack_require__(3);
// Types
var CategoryType = __webpack_require__(4);
var Message = __webpack_require__(9);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString;

var deleteCategory = {
  deleteCategory: {
    type: Message,
    description: 'Deletes category form database by Id',
    args: {
      id: { type: GraphQLString, description: 'Id of category to delete' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        Category.deleteOne({ _id: args.id }, function (err) {
          if (err) reject(err);else resolve({ message: 'success' });
        });
      });
    }
  }
};

module.exports = deleteCategory;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
var Category = __webpack_require__(3);
// Types
var CategoryType = __webpack_require__(4);
var BookType = __webpack_require__(2);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var addBookToCategory = {
  addBookToCategory: {
    type: CategoryType,
    description: 'Adds new book to category by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the category'
      },
      bookId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id,
            bookId = args.bookId;


        Category.findOne({ _id: id }, function (err, category) {
          if (err) reject(err);

          var newCategory = { name: category.name };

          Book.findOneAndUpdate({ _id: bookId }, { $push: { categories: newCategory } }, { new: true }, function (err, updatedBook) {
            if (err) reject(err);else resolve(category);
          });
        });
      });
    }
  }
};

module.exports = addBookToCategory;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
var Category = __webpack_require__(3);
// Types
var CategoryType = __webpack_require__(4);
var BookType = __webpack_require__(2);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var removeBookFromCategory = {
  removeBookFromCategory: {
    type: CategoryType,
    description: 'Adds new book to category by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the category'
      },
      bookId: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id,
            bookId = args.bookId;


        Category.findOne({ _id: id }, function (err, category) {
          if (err) reject(err);

          var newCategory = { name: category.name };

          Book.findOneAndUpdate({ _id: bookId }, { $pull: { categories: newCategory } }, { new: true }, function (err, updatedBook) {
            if (err) reject(err);else resolve(category);
          });
        });
      });
    }
  }
};

module.exports = removeBookFromCategory;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLList = _require.GraphQLList;

var getBooks = {
  getBooks: {
    type: new GraphQLList(BookType),
    description: 'Gets list of all books',
    resolve: function resolve() {
      return new Promise(function (resolve, reject) {
        Book.find(function (err, books) {
          if (err) reject(err);else resolve(books);
        });
      });
    }
  }
};

module.exports = getBooks;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var getBook = {
  getBook: {
    type: BookType,
    description: 'Gets list of all books',
    args: {
      id: { type: new GraphQLNonNull(GraphQLString), description: 'Id of fetched book' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id;


        Book.findOne({ _id: id }, function (err, book) {
          if (err) reject(err);else resolve(book);
        });
      });
    }
  }
};

module.exports = getBook;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
var BookInputType = __webpack_require__(10);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLList = _require.GraphQLList,
    GraphQLInputObjectType = _require.GraphQLInputObjectType;

var createBook = {
  createBook: {
    type: BookType,
    description: 'Creates new book in the database',
    args: {
      book: { type: BookInputType, description: 'Book input object' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var book = args.book;


        Book.create(book, function (err, newBook) {
          if (err) reject(err);else resolve(newBook);
        });
      });
    }
  }
};

module.exports = createBook;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
var BookInputType = __webpack_require__(10);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLList = _require.GraphQLList,
    GraphQLInputObjectType = _require.GraphQLInputObjectType;

var updateBook = {
  updateBook: {
    type: BookType,
    description: 'Updates book in the db',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book you want to update'
      },
      book: { type: BookInputType, description: 'Input book' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id,
            book = args.book;


        Book.findOneAndUpdate({ _id: id }, book, { new: true }, function (err, updatedBook) {
          if (err) reject(err);else resolve(updatedBook);
        });
      });
    }
  }
};

module.exports = updateBook;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
var Message = __webpack_require__(9);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLNonNull = _require.GraphQLNonNull;

var deteleBook = {
  deteleBook: {
    type: Message,
    description: 'Deletes Book form database by Id',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of book to delete'
      }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        Book.deleteOne({ _id: args.id }, function (err) {
          if (err) reject(err);else resolve({ message: 'success' });
        });
      });
    }
  }
};

module.exports = deteleBook;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
var CategoryInputType = __webpack_require__(5);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLList = _require.GraphQLList,
    GraphQLInputObjectType = _require.GraphQLInputObjectType;

var addCategoryToBook = {
  addCategoryToBook: {
    type: BookType,
    description: 'Adds new category to book by ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      },
      category: { type: CategoryInputType, description: 'Inserted category' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id,
            category = args.category;


        Book.findOneAndUpdate({ _id: id }, { $push: { categories: category } }, { new: true }, function (err, updatedBook) {
          if (err) reject(err);else resolve(updatedBook);
        });
      });
    }
  }
};

module.exports = addCategoryToBook;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Book = __webpack_require__(1);
// Types
var BookType = __webpack_require__(2);
var CategoryInputType = __webpack_require__(5);
// GraphQL

var _require = __webpack_require__(0),
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLBoolean = _require.GraphQLBoolean,
    GraphQLList = _require.GraphQLList,
    GraphQLInputObjectType = _require.GraphQLInputObjectType;

var removeCategoryFromBook = {
  removeCategoryFromBook: {
    type: BookType,
    description: 'Removes category from book ID',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'Id of the book'
      },
      category: { type: CategoryInputType, description: 'Removed category' }
    },
    resolve: function resolve(source, args) {
      return new Promise(function (resolve, reject) {
        var id = args.id,
            category = args.category;


        Book.findOneAndUpdate({ _id: id }, { $pull: { categories: category } }, { new: true }, function (err, updatedBook) {
          if (err) reject(err);else resolve(updatedBook);
        });
      });
    }
  }
};

module.exports = removeCategoryFromBook;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Mongoose connection
var mongoose = __webpack_require__(6);
mongoose.connect('mongodb://localhost/reading_app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

/***/ })
/******/ ]);
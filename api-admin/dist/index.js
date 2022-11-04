module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(10);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _mongodb = __webpack_require__(0);

var _mongodb2 = _interopRequireDefault(_mongodb);

var _auth = __webpack_require__(5);

var AuthResolver = _interopRequireWildcard(_auth);

var _user = __webpack_require__(7);

var UserResolver = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(8).config();

const { ApolloServer, gql } = __webpack_require__(9);

var Query = 'type Query {\n    loginUser(input: LoginUserInput): UserResponse\n    getUser(input: LoginUserInput): UserResponse\n}\n';
var Mutation = 'type Mutation {\n    createUser(input: CreateUserInput): UserResponse\n}\n';
var Type = 'type Status {\n    status: Int!\n    message: String\n    accessToken: String\n}\n\ntype User {\n    _id: String!\n    name: String\n    surname: String\n    email: String\n    createdAt: String\n    updatedAt: String\n    deletedAt: String\n}\n\ntype UserResponse {\n    data: User\n    status: Status\n}\n';
var Input = 'input CreateUserInput {\n    name: String!\n    surname: String!\n    email: String!\n    password: String!\n}\n\ninput LoginUserInput {\n    email: String\n    password: String\n    token: String\n}\n';


const MongoClient = _mongodb2.default.MongoClient;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    ${Query}
    ${Mutation}
    ${Type}
    ${Input}
`;

// Provide resolver functions for your schema fields

const uri = `mongodb+srv://${"admin"}:${"rAPoqtdhBSrmHgys"}${"@cluster0.lkdzpkv.mongodb.net/test"}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect((err, client) => {
    console.log(`Connected DB - ${ true ? '(PROD)' : '(DEV)'}`);
    const db = client.db( true ? "voicyme" : process.env.DB_NAME_DEV);

    const app = (0, _express2.default)();

    const resolvers = {
        Query: {
            loginUser: AuthResolver.loginUser,
            getUser: UserResolver.getUser
        },
        Mutation: {
            createUser: AuthResolver.createUser
        }
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            auth: req.headers.authorization,
            dbConnect: db
        }),
        playground: true,
        introspection: true
    });
    server.applyMiddleware({ app });

    app.use('/', (req, res) => res.send({ status: 'ok' }));

    app.listen(process.env.PORT || 4000, () => console.log(`🚀 API ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath} `));
});

client.close();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createUser = exports.loginUser = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = __webpack_require__(1);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = __webpack_require__(6);

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { ObjectID } from 'mongodb';

const loginUser = exports.loginUser = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    const { email = '', password = '' } = input;

    if (email === null || password === null) {
        return {
            status: {
                status: 401,
                message: 'Usuário sem permissão'
            }
        };
    }

    const user = await dbConnect.collection('user').findOne({ email });

    try {
        const match = await _bcrypt2.default.compare(password, user.password);
        const accessToken = _jsonwebtoken2.default.sign(JSON.stringify(user), "1sGpCWAEWn0ht46zff_Iv4");

        if (match === true) {
            return {
                data: _extends({}, user),
                status: {
                    status: 200,
                    message: '',
                    accessToken: accessToken
                }
            };
        } else {
            return {
                data: null,
                status: {
                    status: 401,
                    message: 'User without permission',
                    accessToken: null
                }
            };
        }
    } catch (error) {
        return {
            data: null,
            status: {
                status: 401,
                message: 'User without permission',
                accessToken: null
            }
        };
    }
};

const createUser = exports.createUser = async (parent, { input }, context) => {
    // const auth = context.auth;
    const dbConnect = context.dbConnect;

    const hashedPassword = await _bcrypt2.default.hash(input.password, 10);

    const exist = await dbConnect.collection('user').findOne({ email: input.email });

    if (exist === null) {
        return dbConnect.collection('user').insertOne({
            name: input.name,
            surname: input.surname,
            email: input.email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        }).then(result => {
            return {
                data: null,
                status: {
                    status: 200,
                    message: 'User created.'
                }
            };
        }).catch(err => {
            return {
                data: null,
                status: {
                    status: 403,
                    message: 'Something was wrong in API.'
                }
            };
        });
    } else {
        return {
            data: null,
            status: {
                status: 403,
                message: 'Email used, please create another account with another email.'
            }
        };
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUser = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = __webpack_require__(1);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _mongodb = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUser = exports.getUser = async (parent, { input }, context) => {
    const auth = context.auth;
    const dbConnect = context.dbConnect;

    const token = input.token;

    if (token === null || token === undefined) return {
        data: null,
        status: {
            status: 401,
            message: 'User unauthenticated.'
        }
    };

    return await new Promise((resolve, reject) => _jsonwebtoken2.default.verify(token, "1sGpCWAEWn0ht46zff_Iv4", (err, user) => {
        if (err) {
            reject(err);
        } else {
            resolve(user);
        }
    })).then(async data => {
        let newDate = await dbConnect.collection('user').findOne({ _id: (0, _mongodb.ObjectID)(data._id) });

        return {
            data: _extends({}, newDate, {
                createdAt: newDate.createdAt,
                updateAt: newDate.updateAt
            }),
            status: {
                status: 200,
                message: ''
            }
        };
    }).catch(er => {
        console.log(er);
        return {
            data: null,
            status: {
                status: 401,
                message: 'User unauthenticated.'
            }
        };
    });
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "package.json";

/***/ })
/******/ ]);
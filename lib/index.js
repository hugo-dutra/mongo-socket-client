"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket = __importStar(require("socket.io-client"));
var server_constants_1 = require("./shared/server.constants");
var rxjs_1 = require("rxjs");
var bluebird_1 = __importDefault(require("bluebird"));
var MongoSocketClient = /** @class */ (function () {
    /**
     *
     * @param host Socket host, ex.: http://127.0.0.1
     * @param port Socket host port, ex.: 3030
     * @param databaseName Name from target database
     */
    function MongoSocketClient(host, port, databaseName) {
        this.socketClient = socket.connect(host + ":" + port);
        this.databaseName = databaseName;
        this.socketClient.connected = true;
    }
    /**
     * @returns Return status of connection
     */
    MongoSocketClient.prototype.connected = function () {
        return this.socketClient.connected;
    };
    /**
    *
    * @param document Documento to write
    * @param collection Target collection
    * @returns Promise with object writed
    */
    MongoSocketClient.prototype.insertDocument = function (document, collection) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var insertOne = _this.socketClient.emit(server_constants_1.EMMITER.INSERT_ONE, _this.databaseName, collection, { document: document });
            insertOne.on(server_constants_1.ON.STATUS_SUCCESS, function (value) {
                resolve(value);
            });
            insertOne.on(server_constants_1.ON.STATUS_FAIL, function (value) {
                reject(value);
            });
        });
    };
    /**
       *
       * @param documents Array from documents
       * @param collection Collection targered
       * @returns Promise with array from objects writed
       */
    MongoSocketClient.prototype.insertDocuments = function (documents, collection) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var insertMany = _this.socketClient.emit(server_constants_1.EMMITER.INSERT_MANY, _this.databaseName, collection, documents);
            insertMany.on(server_constants_1.ON.STATUS_SUCCESS, function (value) {
                resolve(value);
            });
            insertMany.on(server_constants_1.ON.STATUS_FAIL, function (value) {
                reject(value);
            });
        });
    };
    /**
     * List colections from database
     */
    MongoSocketClient.prototype.listCollections = function () {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var listCollections = _this.socketClient.emit(server_constants_1.EMMITER.LIST_COLLECTION, _this.databaseName);
            listCollections.on(server_constants_1.ON.STATUS_SUCCESS, function (collections) {
                resolve(collections);
            });
            listCollections.on(server_constants_1.ON.STATUS_FAIL, function (value) {
                reject(value);
            });
        });
    };
    /**
     * List all objects from collection
     * @param collection Target collection
     */
    MongoSocketClient.prototype.listAllObjectsFromCollection = function (collection) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var objectsFromCollection = _this.socketClient.emit(server_constants_1.EMMITER.LIST_ALL_OBJECTS, _this.databaseName, collection);
            objectsFromCollection.on(server_constants_1.ON.STATUS_SUCCESS, function (collections) {
                resolve(collections);
            });
            objectsFromCollection.on(server_constants_1.ON.STATUS_FAIL, function (value) {
                reject(value);
            });
        });
    };
    /**
     * List objects from collection
     * @param collection Target collection
     * @param queryObject Query object. Follow mondodb query pattern
     * @result Array from objects
     */
    MongoSocketClient.prototype.listObjectsFromCollection = function (collection, queryObject) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var objectsFromCollection = _this.socketClient.emit(server_constants_1.EMMITER.LIST_OBJECTS, _this.databaseName, collection, queryObject);
            objectsFromCollection.on(server_constants_1.ON.STATUS_SUCCESS, function (collections) {
                resolve(collections);
            });
            objectsFromCollection.on(server_constants_1.ON.STATUS_FAIL, function (value) {
                reject(value);
            });
        });
    };
    /**
     * Find single object from collection
     * @param id _id mongodb identifier
     * @param collection Targed collection
     * @result Promise with document
     */
    MongoSocketClient.prototype.findObjectById = function (id, collection) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var findObjectById = _this.socketClient.emit(server_constants_1.EMMITER.FIND, _this.databaseName, collection, id);
            findObjectById.on(server_constants_1.ON.STATUS_SUCCESS, function (value) {
                resolve(value);
            });
            findObjectById.on(server_constants_1.ON.STATUS_FAIL, function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * Update one or many objects
     * @param collection Collection`s name
     * @param queryObject Query (mongodb pattern)
     * @param fieldsAndValues fiels to update on objects matches
     */
    MongoSocketClient.prototype.updateObjects = function (collection, queryObject, fieldsAndValues) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var updateObjects = _this.socketClient.emit(server_constants_1.EMMITER.UPDATE, _this.databaseName, collection, queryObject, fieldsAndValues);
            updateObjects.on(server_constants_1.ON.STATUS_SUCCESS, function (value) {
                resolve(value);
            });
            updateObjects.on(server_constants_1.ON.STATUS_FAIL, function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * Create on ChangeStream from collection informed
     * @param collection Target Colection
     * @return documents changed
     */
    MongoSocketClient.prototype.subscribeCollection = function (collection) {
        var _this = this;
        return new rxjs_1.Observable(function (subscriber) {
            var watchCollection = _this.socketClient.emit(server_constants_1.EMMITER.SUBSCRIBE_COLLECTION, _this.databaseName, collection);
            watchCollection.on(server_constants_1.ON.COLLECTION_CHANGED, function (doc) {
                subscriber.next(doc);
            });
        });
    };
    return MongoSocketClient;
}());
exports.default = MongoSocketClient;
//# sourceMappingURL=index.js.map
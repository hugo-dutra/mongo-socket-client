"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket = __importStar(require("socket.io-client"));
const server_constants_1 = require("./shared/server.constants");
const rxjs_1 = require("rxjs");
class MongoSocketClient {
    /**
     * @author Hugo Alves Dutra |
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * @param host Socket host, ex.: http://127.0.0.1
     * @param port Socket host port, ex.: 3030
     * @param databaseName Name from target database
     */
    constructor(host, port, databaseName) {
        this.socketClient = socket.connect(`${host}:${port}`);
        this.databaseName = databaseName;
        this.socketClient.connected = true;
    }
    /**
     * @returns Return status of connection
     */
    connected() {
        return this.socketClient.connected;
    }
    /**
    * @author Hugo Alves Dutra
    * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
    * @param document Documento to write
    * @param collection Target collection
    * @returns Promise with object writed
    */
    insertDocument(document, collection) {
        return new Promise((resolve, reject) => {
            const insertOne = this.socketClient.emit(server_constants_1.EMMITER.INSERT_ONE, this.databaseName, collection, document);
            insertOne.on(server_constants_1.ON.STATUS_SUCCESS, (value) => {
                resolve(value);
            });
            insertOne.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
       * @author Hugo Alves Dutra
       * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
       * @param documents Array from documents
       * @param collection Collection targered
       * @returns Promise with array from objects writed
       */
    insertDocuments(documents, collection) {
        return new Promise((resolve, reject) => {
            const insertMany = this.socketClient.emit(server_constants_1.EMMITER.INSERT_MANY, this.databaseName, collection, documents);
            insertMany.on(server_constants_1.ON.STATUS_SUCCESS, (value) => {
                resolve(value);
            });
            insertMany.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * List colections from database
     * @result List from collections to database informed
     */
    listCollections() {
        return new Promise((resolve, reject) => {
            const listCollections = this.socketClient.emit(server_constants_1.EMMITER.LIST_COLLECTION, this.databaseName);
            listCollections.on(server_constants_1.ON.STATUS_SUCCESS, (collections) => {
                resolve(collections);
            });
            listCollections.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * List all objects from collection
     * @param collection Target collection
     * @result Objects from colletion informed
     */
    listAllObjectsFromCollection(collection) {
        return new Promise((resolve, reject) => {
            const objectsFromCollection = this.socketClient.emit(server_constants_1.EMMITER.LIST_ALL_OBJECTS, this.databaseName, collection);
            objectsFromCollection.on(server_constants_1.ON.STATUS_SUCCESS, (collections) => {
                resolve(collections);
            });
            objectsFromCollection.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * List objects from collection
     * @param collection Target collection
     * @param queryObject MongoDb query object @link https://docs.mongodb.com/manual/tutorial/query-documents/
     * @result Array from objects
     */
    listObjectsFromCollection(collection, queryObject) {
        return new Promise((resolve, reject) => {
            const objectsFromCollection = this.socketClient.emit(server_constants_1.EMMITER.LIST_OBJECTS, this.databaseName, collection, queryObject);
            objectsFromCollection.on(server_constants_1.ON.STATUS_SUCCESS, (collections) => {
                resolve(collections);
            });
            objectsFromCollection.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Delete single object from collection
     * @param collection Collection targed
     * @param objectId Target object from ObjectId
     * @result Information from deleted object
     */
    deleteObjectById(collection, objectId) {
        return new Promise((resolve, reject) => {
            const objectFromCollection = this.socketClient.emit(server_constants_1.EMMITER.DELETE_ONE, this.databaseName, collection, objectId);
            objectFromCollection.on(server_constants_1.ON.STATUS_SUCCESS, (value) => {
                resolve(value);
            });
            objectFromCollection.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Delete on or many objects from target collecton
     * @param collection Target collection
     * @param queryObject MongoDb query object {@link https://docs.mongodb.com/manual/tutorial/query-documents/ }
     * @result Information from objects deleted
     */
    deleteObjects(collection, queryObject) {
        return new Promise((resolve, reject) => {
            const objectsFromCollection = this.socketClient.emit(server_constants_1.EMMITER.DELETE_MANY, this.databaseName, collection, queryObject);
            objectsFromCollection.on(server_constants_1.ON.STATUS_SUCCESS, (value) => {
                resolve(value);
            });
            objectsFromCollection.on(server_constants_1.ON.STATUS_FAIL, (value) => {
                reject(value);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Find single object from collection
     * @param id _id mongodb identifier
     * @param collection Targed collection
     * @result Promise with document
     */
    findObjectById(id, collection) {
        return new Promise((resolve, reject) => {
            const findObjectById = this.socketClient.emit(server_constants_1.EMMITER.FIND, this.databaseName, collection, id);
            findObjectById.on(server_constants_1.ON.STATUS_SUCCESS, (value) => {
                resolve(value);
            });
            findObjectById.on(server_constants_1.ON.STATUS_FAIL, (reason) => {
                reject(reason);
            });
        });
    }
    /**
     * Update one or many objects
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * @param collection Collection`s name
     * @param queryObject  MongoDb query object {@link https://docs.mongodb.com/manual/tutorial/query-documents/ }
     * @param fieldsAndValues fiels to update on objects matches
     * @result information from updated objects
     */
    updateObjects(collection, queryObject, fieldsAndValues) {
        return new Promise((resolve, reject) => {
            const updateObjects = this.socketClient.emit(server_constants_1.EMMITER.UPDATE, this.databaseName, collection, queryObject, fieldsAndValues);
            updateObjects.on(server_constants_1.ON.STATUS_SUCCESS, (value) => {
                resolve(value);
            });
            updateObjects.on(server_constants_1.ON.STATUS_FAIL, (reason) => {
                reject(reason);
            });
        });
    }
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Create on ChangeStream from collection informed.
     * *** THIS METHOD JUST WORK ON REPLICA SET MONGODB ***
     * @param collection Target Colection
     * @return documents changed
     */
    subscribeCollection(collection) {
        return new rxjs_1.Observable((subscriber) => {
            const watchCollection = this.socketClient.emit(server_constants_1.EMMITER.SUBSCRIBE_COLLECTION, this.databaseName, collection);
            watchCollection.on(server_constants_1.ON.COLLECTION_CHANGED, (doc) => {
                subscriber.next(doc);
            });
        });
    }
}
exports.default = MongoSocketClient;
//# sourceMappingURL=index.js.map
import * as socket from 'socket.io-client';
import { EMMITER, ON } from './shared/server.constants';
import { Observable, Subscriber } from 'rxjs';


export default class MongoSocketClient {
  private socketClient: SocketIOClient.Socket;
  private databaseName: string;

  /**
   * @author Hugo Alves Dutra |
   * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
   * @param host Socket host, ex.: http://127.0.0.1
   * @param port Socket host port, ex.: 3030
   * @param databaseName Name from target database
   */
  constructor(host: string, port: number, databaseName: string) {
    this.socketClient = socket.connect(`${host}:${port}`);
    this.databaseName = databaseName;
    this.socketClient.connected = true;
  }

  /**
   * @returns Return status of connection
   */
  public connected(): boolean {
    return this.socketClient.connected;
  }

  /**
  * @author Hugo Alves Dutra
  * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
  * @param document Documento to write
  * @param collection Target collection
  * @returns Promise with object writed
  */
  public insertDocument(document: Object, collection: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const insertOne = this.socketClient.emit(EMMITER.INSERT_ONE, this.databaseName, collection, document);
      insertOne.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      insertOne.on(ON.STATUS_FAIL, (value: any) => {
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
  public insertDocuments(documents: Object[], collection: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const insertMany = this.socketClient.emit(EMMITER.INSERT_MANY, this.databaseName, collection, documents);
      insertMany.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      insertMany.on(ON.STATUS_FAIL, (value: any) => {
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
  public listCollections(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const listCollections = this.socketClient.emit(EMMITER.LIST_COLLECTION, this.databaseName);
      listCollections.on(ON.STATUS_SUCCESS, (collections: any[]) => {
        resolve(collections);
      });
      listCollections.on(ON.STATUS_FAIL, (value: any) => {
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
  public listAllObjectsFromCollection(collection: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const objectsFromCollection = this.socketClient.emit(EMMITER.LIST_ALL_OBJECTS, this.databaseName, collection);
      objectsFromCollection.on(ON.STATUS_SUCCESS, (collections: any[]) => {
        resolve(collections);
      });
      objectsFromCollection.on(ON.STATUS_FAIL, (value: any) => {
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
  public listObjectsFromCollection(collection: string, queryObject: Object): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const objectsFromCollection = this.socketClient.emit(EMMITER.LIST_OBJECTS, this.databaseName, collection, queryObject);
      objectsFromCollection.on(ON.STATUS_SUCCESS, (collections: any[]) => {
        resolve(collections);
      });
      objectsFromCollection.on(ON.STATUS_FAIL, (value: any) => {
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
  public deleteObjectById(collection: string, objectId: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const objectFromCollection = this.socketClient.emit(EMMITER.DELETE_ONE, this.databaseName, collection, objectId);
      objectFromCollection.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      objectFromCollection.on(ON.STATUS_FAIL, (value: any) => {
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
  public deleteObjects(collection: string, queryObject: Object): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const objectsFromCollection = this.socketClient.emit(EMMITER.DELETE_MANY, this.databaseName, collection, queryObject);
      objectsFromCollection.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      objectsFromCollection.on(ON.STATUS_FAIL, (value: any) => {
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
  public findObjectById(id: String, collection: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const findObjectById = this.socketClient.emit(EMMITER.FIND, this.databaseName, collection, id);
      findObjectById.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      findObjectById.on(ON.STATUS_FAIL, (reason: any) => {
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
  public updateObjects(collection: string, queryObject: Object, fieldsAndValues: Object): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const updateObjects = this.socketClient.emit(EMMITER.UPDATE, this.databaseName, collection, queryObject, fieldsAndValues);
      updateObjects.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      updateObjects.on(ON.STATUS_FAIL, (reason: any) => {
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
  public subscribeCollection(collection: string): Observable<any> {
    return new Observable((subscriber: Subscriber<any>) => {
      const watchCollection = this.socketClient.emit(EMMITER.SUBSCRIBE_COLLECTION, this.databaseName, collection);
      watchCollection.on(ON.COLLECTION_CHANGED, (doc: any) => {
        subscriber.next(doc);
      });
    });
  }

}


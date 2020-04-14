import * as socket from 'socket.io-client';
import { EMMITER, ON } from './shared/server.constants';
import { Observable, Subscriber } from 'rxjs';
import Promise from 'bluebird';

export default class MongoSocketClient {
  private socketClient: SocketIOClient.Socket;
  private databaseName: string;

  /**
   *
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
  *
  * @param document Documento to write
  * @param collection Target collection
  * @returns Promise with object writed
  */
  public insertDocument(document: Object, collection: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const insertOne = this.socketClient.emit(EMMITER.INSERT_ONE, this.databaseName, collection, { document: document });
      insertOne.on(ON.STATUS_SUCCESS, (value: any) => {
        resolve(value);
      });
      insertOne.on(ON.STATUS_FAIL, (value: any) => {
        reject(value);
      });
    });
  }

  /**
     *
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
   * List colections from database
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
   * List all objects from collection
   * @param collection Target collection
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
   * List objects from collection
   * @param collection Target collection
   * @param queryObject Query object. Follow mondodb query pattern
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
   * @param collection Collection`s name
   * @param queryObject Query (mongodb pattern)
   * @param fieldsAndValues fiels to update on objects matches
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
   * Create on ChangeStream from collection informed
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


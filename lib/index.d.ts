import { Observable } from 'rxjs';
import Promise from 'bluebird';
export default class MongoSocketClient {
    private socketClient;
    private databaseName;
    /**
     *
     * @param host Socket host, ex.: http://127.0.0.1
     * @param port Socket host port, ex.: 3030
     * @param databaseName Name from target database
     */
    constructor(host: string, port: number, databaseName: string);
    /**
     * @returns Return status of connection
     */
    connected(): boolean;
    /**
    *
    * @param document Documento to write
    * @param collection Target collection
    * @returns Promise with object writed
    */
    insertDocument(document: Object, collection: string): Promise<any>;
    /**
       *
       * @param documents Array from documents
       * @param collection Collection targered
       * @returns Promise with array from objects writed
       */
    insertDocuments(documents: Object[], collection: string): Promise<any>;
    /**
     * List colections from database
     */
    listCollections(): Promise<any>;
    /**
     * List all objects from collection
     * @param collection Target collection
     */
    listAllObjectsFromCollection(collection: string): Promise<any>;
    /**
     * List objects from collection
     * @param collection Target collection
     * @param queryObject Query object. Follow mondodb query pattern
     * @result Array from objects
     */
    listObjectsFromCollection(collection: string, queryObject: Object): Promise<any>;
    /**
     * Find single object from collection
     * @param id _id mongodb identifier
     * @param collection Targed collection
     * @result Promise with document
     */
    findObjectById(id: String, collection: string): Promise<any>;
    /**
     * Update one or many objects
     * @param collection Collection`s name
     * @param queryObject Query (mongodb pattern)
     * @param fieldsAndValues fiels to update on objects matches
     */
    updateObjects(collection: string, queryObject: Object, fieldsAndValues: Object): Promise<any>;
    /**
     * Create on ChangeStream from collection informed
     * @param collection Target Colection
     * @return documents changed
     */
    subscribeCollection(collection: string): Observable<any>;
}
//# sourceMappingURL=index.d.ts.map
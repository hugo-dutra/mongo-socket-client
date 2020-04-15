import { Observable } from 'rxjs';
export default class MongoSocketClient {
    private socketClient;
    private databaseName;
    /**
     * @author Hugo Alves Dutra |
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
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
    * @author Hugo Alves Dutra
    * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
    * @param document Documento to write
    * @param collection Target collection
    * @returns Promise with object writed
    */
    insertDocument(document: Object, collection: string): Promise<any>;
    /**
       * @author Hugo Alves Dutra
       * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
       * @param documents Array from documents
       * @param collection Collection targered
       * @returns Promise with array from objects writed
       */
    insertDocuments(documents: Object[], collection: string): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * List colections from database
     * @result List from collections to database informed
     */
    listCollections(): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * List all objects from collection
     * @param collection Target collection
     * @result Objects from colletion informed
     */
    listAllObjectsFromCollection(collection: string): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * List objects from collection
     * @param collection Target collection
     * @param queryObject MongoDb query object @link https://docs.mongodb.com/manual/tutorial/query-documents/
     * @result Array from objects
     */
    listObjectsFromCollection(collection: string, queryObject: Object): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Delete single object from collection
     * @param collection Collection targed
     * @param objectId Target object from ObjectId
     * @result Information from deleted object
     */
    deleteObjectById(collection: string, objectId: string): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Delete on or many objects from target collecton
     * @param collection Target collection
     * @param queryObject MongoDb query object {@link https://docs.mongodb.com/manual/tutorial/query-documents/ }
     * @result Information from objects deleted
     */
    deleteObjects(collection: string, queryObject: Object): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Find single object from collection
     * @param id _id mongodb identifier
     * @param collection Targed collection
     * @result Promise with document
     */
    findObjectById(id: String, collection: string): Promise<any>;
    /**
     * Update one or many objects
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * @param collection Collection`s name
     * @param queryObject  MongoDb query object {@link https://docs.mongodb.com/manual/tutorial/query-documents/ }
     * @param fieldsAndValues fiels to update on objects matches
     * @result information from updated objects
     */
    updateObjects(collection: string, queryObject: Object, fieldsAndValues: Object): Promise<any>;
    /**
     * @author Hugo Alves Dutra
     * @link Feel free to colaborate github: https://github.com/hugo-dutra/mongo-socket-client
     * Create on ChangeStream from collection informed.
     * *** THIS METHOD JUST WORK ON REPLICA SET MONGODB ***
     * @param collection Target Colection
     * @return documents changed
     */
    subscribeCollection(collection: string): Observable<any>;
}
//# sourceMappingURL=index.d.ts.map
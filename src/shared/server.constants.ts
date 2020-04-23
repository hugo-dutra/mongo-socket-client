export const EMMITER = {
  INSERT_ONE: 'insertOne',
  INSERT_MANY: 'insertMany',
  DELETE_ONE: 'deleteOne',
  DELETE_MANY: 'deleteMany',
  FIND: 'find',
  REPLACE_ONE: 'replaceOne',
  UPDATE_ONE: 'updateOne',
  UPDATE_MANY: 'updateMany',
  SUBSCRIBE_COLLECTION: 'subscribeCollection',
  LIST_COLLECTION: 'listCollection',
  LIST_ALL_OBJECTS: 'listAllObjects',
  LIST_OBJECTS: 'listObjects',
}

export const ON = {
  COLLECTION_CHANGED: 'collectionChanged',
  //DOCUMENTS_CHANGED: 'documentsChanged',
  STATUS_SUCCESS: 'success',
  STATUS_FAIL: 'fail',
  SUBSCRIBE_COLLECTION: 'subscribeCollection',
  SUBSCRIBE_DOCUMENTS: 'subscribeDocuments',
}
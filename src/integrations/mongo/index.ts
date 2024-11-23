import mongoose from "mongoose";

async function get(db: any, collectionName: string, filter: object) {
  const document = await db!.collection(collectionName).findOne(filter);
  return document;
}

async function getAll(db: any, collectionName: string, filter: object = {}) {
  const document = await db!.collection(collectionName).find(filter).toArray();
  return document;
}

async function getOrCreate(db: any, collectionName: string, filter: object, newData: object) {
  let document = await db!.collection(collectionName).findOne(filter);
  if (!document) {
    document = await db!.collection(collectionName).insertOne(newData);
  }

  return document;
}

async function createDocument(db: any, collectionName: string, newData: object) {
  const document = await db!.collection(collectionName).insertOne(newData);
  return document;
}

async function remove(db: any, collectionName: string, filter: object) {
  const document = await db!.collection(collectionName).deleteOne(filter);
  if (document.deletedCount === 0) {
    throw new Error('The document to delete is not found');
  }
  return document.deletedCount;
}

async function upsert(db: any, collectionName: string, newData: object, filter: object = {}) {
  const document = await db!.collection(collectionName).updateOne(filter, { $set: newData }, { upsert: true });
  return document;
}


async function getMongoConnection(dbName: string) {
  console.log(`Connecting to mongo ... `);
  const connectionString = process.env.ATLAS_URI || "";
  const client = await mongoose.connect(`${connectionString.replace(/\/$/, '')}/${dbName}`);
  console.log(`Connected.`);
  return client.connection.db;
}

export { get, getAll, getOrCreate, remove, upsert, getMongoConnection, createDocument };
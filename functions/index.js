const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const algoliasearch = require("algoliasearch");
const ALGOLIA_ID = functions.config().algoria.app_id;
const ALGOLIA_ADMIN_ID = functions.config().algoria.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algoria.search_key;
const ALGOLIA_INDEX_NAME = "posts_query_suggestions";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_ID);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onNoteCreated = functions.firestore
    .document("posts/{id}")
    .onCreate((snap, context) => {
      // Get the note document
      const data = snap.data();
      // Add an 'objectID' field which Aloglia requires
      data.objectID = context.params.id;
      // Write to the algolia index
      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      console.log("onCreated triggered", JSON.stringify(data));
      return index.saveObject(data);
    });

exports.onNoteUpdated = functions.firestore
    .document("posts/{id}")
    .onUpdate((change, context) => {
    // Get the note document
      const data = change.after.data();
      // Add an 'objectID' field which Aloglia requires
      data.objectID = context.params.id;
      // Write to the algolia index
      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      console.log("onUpdated triggered", JSON.stringify(data));
      return index.saveObject(data);
    });

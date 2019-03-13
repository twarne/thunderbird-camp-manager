import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID
};

const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.store = app.firestore();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  // *** User API ***

  user = uid =>
    this.store
      .collection('users')
      .doc(uid)
      .get();

  users = () => this.store.collection('users').get();

  storeUser = (uid, userDetails) =>
    this.store
      .collection('users')
      .doc(uid)
      .set(userDetails);

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid).then(dbUserDoc => {
          if (dbUserDoc) {
            const dbUser = dbUserDoc.data();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          }
        });
      } else {
        fallback();
      }
    });

  // *** Domain API ***

  getData = docPath => this.store.doc(docPath);

  loadEventDetails = eventKey => {
    const eventsCollection = this.store.collection('events');
    const eventDoc = eventsCollection.where('key', '==', eventKey).get();
    return eventDoc;
  };

  loadEvents = () => this.store.collection('events').get();

  loadPermissionFormsForEvent = eventRef =>
    this.store
      .collection('permissionForms')
      .where('eventRef', '==', eventRef)
      .get();

  storeParticipant = participant => this.store.collection('participants').add(participant);

  storePermissionForm = permissionForm => this.store.collection('permissionForms').add(permissionForm);

  storeReleaseForm = releaseForm => this.store.collection('releaseForms').add(releaseForm);
}

export default Firebase;

import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAUe742I9j3tAhnWQUb7U-N3aIzzNV5Iuk',
  authDomain: 'thunderbird-camp-manager.firebaseapp.com',
  databaseURL: 'https://thunderbird-camp-manager.firebaseio.com',
  projectId: 'thunderbird-camp-manager',
  storageBucket: 'thunderbird-camp-manager.appspot.com',
  messagingSenderId: '873422853914'
};
firebase.initializeApp(config);

const storePermissionSlip = function(participantIn, permissionSlip) {
  const db = firebase.firestore();
  const participant = permissionSlip.participantInformation.participant;
  const participantRef = db.collection('participants').add(participant);
};

export default storePermissionSlip;

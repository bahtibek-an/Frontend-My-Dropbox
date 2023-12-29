import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

    var config = {
      apiKey: "AIzaSyDt1ILEden3HN0TO6U-EACB-ioWIPUKgxM",
      authDomain: "denislamklimov-dropbox.firebaseapp.com",
      projectId: "denislamklimov-dropbox",
      storageBucket: "denislamklimov-dropbox.appspot.com",
      messagingSenderId: "392302206633",
      appId: "1:392302206633:web:90485529e533f8ccc853b8"
      };
      // Initialize Firebase
      firebase.initializeApp(config);
      
    firebase.firestore().settings({timestampsInSnapshots: true});
    export default firebase;

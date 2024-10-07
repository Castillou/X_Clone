import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC6INMtD2BHgsUWXB0lvvufj35bPw0Bfxc',
	authDomain: 'switter-reloaded-9f00b.firebaseapp.com',
	projectId: 'switter-reloaded-9f00b',
	storageBucket: 'switter-reloaded-9f00b.appspot.com',
	messagingSenderId: '174950776301',
	appId: '1:174950776301:web:a31b28c66e07671eafbbe4',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyCuFFh5g3flJljefRsUMm3iyrJdZ2j3ESk',
	authDomain: 'udemy-1af3a.firebaseapp.com',
	projectId: 'udemy-1af3a',
	storageBucket: 'udemy-1af3a.appspot.com',
	messagingSenderId: '777990755753',
	appId: '1:777990755753:web:68fec2bc731499488b20b8',
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export { storage }

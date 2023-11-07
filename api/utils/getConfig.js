import { firestoreDb } from '../utils/firebase.js';

const getConfig = async () => await firestoreDb.getDoc('Config', 'ApiGateway')

export default getConfig;


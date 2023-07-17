import { firestoreDb } from '../utils/firebase.js';

const getConfig = async () => {
    const config = await firestoreDb.getDoc('Config', 'ApiGateway');
    return config
};

export default getConfig
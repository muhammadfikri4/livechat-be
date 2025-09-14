import admin from 'firebase-admin';
import { FirebaseNotificationMessage } from '../interface/FirebaseNotificationMessage';
import { config } from '../libs';

export const firebase = admin.initializeApp({
    credential: admin.credential.cert({
        clientEmail: config.FIREBASE.CLIENT_EMAIL,
        privateKey: config.FIREBASE.PRIVATE_KEY.replace(/\\n/g, '\n'),
        projectId: config.FIREBASE.PROJECT_ID
    })
})

export const SendFirebaseNotification = async (message: FirebaseNotificationMessage) => {
    return await firebase.messaging().send(message);
}

import * as React from 'react';
import { getApp } from '@react-native-firebase/app';
import { collection, getDocs, getFirestore } from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';



export const APP_Firebase = getApp();
export const db_Firebase = getFirestore(APP_Firebase);
export const toast = (message) => {
    Toast.show(message, Toast.LONG, {
        backgroundColor: 'blue',
    });
}

export const getID = async (firstIndex = 100, collections) => {
    const snapshot = await getDocs(collection(db_Firebase, collections)).catch(err => { console.log(err, '-----err getID'); });
    const snap = snapshot.docs.map(doc => { return doc.id })
    const lastid = snap[snap.length - 1]
    if (!lastid) {
        return firstIndex
    }
    else {
        return (Number(lastid) + 1)
    }
}
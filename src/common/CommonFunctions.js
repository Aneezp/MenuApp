import * as React from 'react';
import { getApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';



export const APP_Firebase = getApp();
export const db_Firebase = getFirestore(APP_Firebase);
export const toast = (message) => {
    Toast.show(message, Toast.LONG, {
        backgroundColor: 'blue',
    });
}
import Config from "react-native-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base64 } from "./base64";
import DeviceInfo from "react-native-device-info";
import { decryptData, encryptData } from "./encryption";

const STORE_KEY = Config.storeKey;
const deviceId = DeviceInfo.getUniqueId();

export const saveToLocalStore = async (key, value) => {
    try {
        const base64Value = Base64.encode(STORE_KEY + JSON.stringify(value) + deviceId);
        const encryptedString = await encryptData(base64Value, STORE_KEY);
        const res = await AsyncStorage.setItem(key + STORE_KEY, encryptedString);
        return true;
    } catch (error) {
        console.error("Error saving to local store: ", error);
        return false;
    }
}
export const getFromLocalStore = async (key) => {
    try {
        const storedValue = await AsyncStorage.getItem(key + STORE_KEY);
        if (storedValue !== null) {
            const decryptedValue = await decryptData(storedValue, STORE_KEY);
            const decodedValue = Base64.decode(decryptedValue);
            const originalValue = decodedValue.replace(STORE_KEY, '').replace(deviceId, '');
            return JSON.parse(originalValue);
        }
        return null;
    } catch (error) {
        console.error("Error retrieving from local store: ", error);
        return null;
    }
}

export const removeFromLocalStore = async (key) => {
    try {
        await AsyncStorage.removeItem(key + STORE_KEY);
    } catch (error) {
        console.error("Error removing from local store: ", error);
    }
}
export const clearLocalStore = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Error clearing local store: ", error);
    }
}

export const getAllkeysFromSrore = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        return keys;
    } catch (error) {
        console.error("Error getting all keys from local store: ", error);
        return [];
    }
}
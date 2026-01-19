import Aes from 'react-native-aes-crypto'
import Config from 'react-native-config';

export const generateKey = (key) => Aes.pbkdf2(key, 'salt', 5000, 256, 'sha256')
const iv = Config.IV;
export const encryptData = async (text, key) => {
    try {
        const cipher = await Aes.encrypt(text, key, iv, 'aes-256-cbc')
        return cipher
    } catch (error) {
        console.log(error, '--enc Err');
    }
}


export const decryptData = async (encryptedData, key) => {
    // const generatedKey = await generateKey(key);
    try {
        const decrypted = await Aes.decrypt(encryptedData, key, iv, 'aes-256-cbc')
        return decrypted;
    } catch (error) {
        console.log(error, '--dec Err');
    }
}

import React, { use, useContext, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LoggedContext } from '../../../common/Context';
import { getDoc, doc } from '@react-native-firebase/firestore';
import { decryptData } from '../../../common/encryption';
import { saveToLocalStore } from '../../../common/localStore';

import Config from "react-native-config";
import { db_Firebase, toast } from '../../../common/CommonFunctions';

export default function LoginScreen() {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('MenuAppAdmin@0000#$');

    const logedContext = useContext(LoggedContext);

    const handleLogin = async () => {
        // const encryptedPassword = await encryptData('MenuAppAdmin@0000#$', Config.passwordEncKey);
        // const decrypt1 = await decryptData(encryptedPassword, Config.passwordEncKey);
        // console.log(encryptedPassword, '--pwww', decrypt1);

        //  const generatedKey = await generateKey('menuAppUserSessionKey');
        if (username == '' || password == '') {
            toast('Please enter both username and password');
        }
        else {
            try {
                const clean = username.trim().toLowerCase();
                const docRef = doc(db_Firebase, "Users", clean); // Users collection, docId = "users"
                const snap = await getDoc(docRef).catch((e) => {
                    console.error('Error getting document:', e);
                })
                if (snap.exists()) {
                    const usersData = snap.data();
                    if (usersData?.username && usersData?.username === clean) {
                        const decryptedPassword = await decryptData(usersData?.password, Config.passwordEncKey);
                        if (decryptedPassword === password) {
                            const res = await saveToLocalStore('userSession', {
                                username: clean,
                                loggedInAt: new Date().toISOString(),
                                logged: true,
                                role: usersData?.username === 'admin' ? 'admin' : 'user',
                            });

                            toast("Login successful")
                            if (usersData?.username === 'admin') {
                                logedContext.setUserRole('admin');
                            } else {
                                logedContext.setUserRole('user');
                            }
                            logedContext.setLogged(true);
                        } else {
                            toast("Invalid password")
                        }
                    }
                    else {
                        toast('Username not found')
                    }
                }
                else {
                    toast('User not found')
                }
                // console.log(snap.data(), '---doxxc');
            } catch (error) {
                console.error("Error fetching users: ", error);
                if (error?.code === 'permission-denied') {
                    console.warn('Firestore permission denied: make sure your Firestore rules allow reads for this collection or authenticate the user first.');
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                placeholderTextColor="#999"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
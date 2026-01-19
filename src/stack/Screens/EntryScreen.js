import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { clearLocalStore, getAllkeysFromSrore, getFromLocalStore } from '../../common/localStore';
import { LoggedContext } from '../../common/Context';

const EntryScreen = ({ navigation }) => {
    const logedContext = useContext(LoggedContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            checkLoggedIn()
        }, 300);

        return () => clearTimeout(timer);
    }, [navigation]);

    const checkLoggedIn = async () => {
        // const keys = await getAllkeysFromSrore('appKeys');
        // console.log(keys);
        // const clr = await clearLocalStore()
        
        const isLoggedIn = await getFromLocalStore('userSession');
        if (isLoggedIn) {
            logedContext.setUserRole(isLoggedIn.role);
            logedContext.setLogged(true);
        } else {
            logedContext.resetContext()
            navigation.navigate('Login');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default EntryScreen;
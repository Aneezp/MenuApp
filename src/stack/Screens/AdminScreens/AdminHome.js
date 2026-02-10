import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { removeFromLocalStore } from '../../../common/localStore';
import { LoggedContext } from '../../../common/Context';



const AdminHome = ({ ...props }) => {
    const logedContext = useContext(LoggedContext);


    const profile = {
        name: 'John Doe',
        role: 'Admin',
        image: 'https://picsum.photos/id/100/200/300', // Dummy image URL
    };

    const menuItems = [
        { id: 1, title: 'Add Menu', onPress: () => props?.navigation.navigate("AddMenu") },
        { id: 6, title: 'View Menu', onPress: () => props?.navigation.navigate("ViewMenu") },
        // { id: 2, title: 'Update Menu', onPress: () => console.log('Update Menu') },
        { id: 1, title: 'Add Category', onPress: () => props?.navigation.navigate("AddCategory") },
        { id: 1, title: 'View Category', onPress: () => props?.navigation.navigate("ViewCategory") },
        { id: 3, title: 'Add Waiter', onPress: () => console.log('Add Waiter') },
        { id: 4, title: 'Update Waiter', onPress: () => console.log('Update Waiter') },
        { id: 5, title: 'Logout', onPress: () => logoutFunction() },
    ];

    const logoutFunction = async () => {
        await removeFromLocalStore('userSession');
        logedContext.resetContext();
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: profile.image }} style={styles.profileImage} />
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileRole}>{profile.role}</Text>
            </View>

            <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.menuButton} onPress={item.onPress}>
                        <Text style={styles.menuText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 15,
        padding: 20,
        shadowColor: Platform.select({ ios: '#ee1515ff', android: '#ee151556' }),
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        overflow: 'visible'
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    profileRole: {
        fontSize: 16,
        color: '#666',
    },
    menuContainer: {
        marginTop: 20,
    },
    menuButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#f50c0cff',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 100,
    },
    menuText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
});

export default AdminHome;
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db_Firebase } from '../../../common/CommonFunctions'; // Adjust path if needed
import { collection, getDocs } from '@react-native-firebase/firestore';
import { HeaderComponent } from '../CommonComponents'; // Adjust path if needed
import { useIsFocused } from '@react-navigation/native';

const ViewMenu = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            fetchMenu();
        }

    }, [isFocused]);

    const fetchMenu = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db_Firebase, "menu"));
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setMenuItems(items);
        } catch (error) {
            console.error("Error fetching menu: ", error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        let imageSource;
        if (item.linktype === 'image') {
            imageSource = { uri: `data:image/jpeg;base64,${item.image}` };
        } else {
            imageSource = { uri: item.image };
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: '100%', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image
                        source={imageSource}
                        style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ fontSize: 16 }}>{item.price}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddMenu", { itemToEdit: item })}
                    style={{ backgroundColor: '#007bff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Edit</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComponent title="View Menu" />
            <View style={{ flex: 1, alignItems: 'center' }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        data={menuItems}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
                        style={{ width: width * 0.95, marginTop: 10 }}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No menu items found.</Text>}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default ViewMenu;

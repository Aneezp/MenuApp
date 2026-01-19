import * as React from 'react';
import { Image, SectionList, Text, TextInput, Touchable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { CartIcon, LogoutIcon, MinusIcon, PlusIcon, SearchIcon } from '../../../Components/Svg';
import { LoggedContext } from '../../../common/Context';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearLocalStore, getAllkeysFromSrore, removeFromLocalStore } from '../../../common/localStore';

export default function HomeScreen() {
    const logedContext = React.useContext(LoggedContext);
    const { width, height } = useWindowDimensions();
    const hotelMenu = {
        appetizers: [
            { id: 1, name: 'Bruschetta', price: '$8', imageUrl: 'https://picsum.photos/id/1/200/300' },
            { id: 2, name: 'Calamari Fritti', price: '$10', imageUrl: 'https://picsum.photos/id/2/200/300' },
            { id: 3, name: 'Mozzarella Sticks', price: '$9', imageUrl: 'https://picsum.photos/id/3/200/300' },
            { id: 4, name: 'Spring Rolls', price: '$7', imageUrl: 'https://picsum.photos/id/4/200/300' },
            { id: 5, name: 'Garlic Bread', price: '$6', imageUrl: 'https://picsum.photos/id/5/200/300' },
        ],
        mainCourses: [
            { id: 6, name: 'Grilled Salmon', price: '$22', imageUrl: 'https://picsum.photos/id/6/200/300' },
            { id: 7, name: 'Ribeye Steak', price: '$28', imageUrl: 'https://picsum.photos/id/7/200/300' },
            { id: 8, name: 'Chicken Parmesan', price: '$18', imageUrl: 'https://picsum.photos/id/8/200/300' },
            { id: 9, name: 'Pasta Alfredo', price: '$16', imageUrl: 'https://picsum.photos/id/9/200/300' },
            { id: 10, name: 'Lamb Chops', price: '$26', imageUrl: 'https://picsum.photos/id/10/200/300' },
        ],
        desserts: [
            { id: 11, name: 'Tiramisu', price: '$8', imageUrl: 'https://picsum.photos/id/11/200/300' },
            { id: 12, name: 'Chocolate Cake', price: '$7', imageUrl: 'https://picsum.photos/id/12/200/300' },
            { id: 13, name: 'Cheesecake', price: '$9', imageUrl: 'https://picsum.photos/id/13/200/300' },
            { id: 14, name: 'Crème Brûlée', price: '$10', imageUrl: 'https://picsum.photos/id/14/200/300' },
        ],
        beverages: [
            { id: 15, name: 'Espresso', price: '$4', imageUrl: 'https://picsum.photos/id/15/200/300' },
            { id: 16, name: 'Cappuccino', price: '$5', imageUrl: 'https://picsum.photos/id/16/200/300' },
            { id: 17, name: 'Fresh Juice', price: '$6', imageUrl: 'https://picsum.photos/id/17/200/300' },
            { id: 18, name: 'Soft Drink', price: '$3', imageUrl: 'https://picsum.photos/id/18/200/300' },
            { id: 19, name: 'Wine Selection', price: '$12', imageUrl: 'https://picsum.photos/id/19/200/300' },
            { id: 20, name: 'Beer', price: '$5', imageUrl: 'https://picsum.photos/id/20/200/300' },
        ],
    };
    const [cart, setCart] = React.useState({});
    const [searchQuery, setSearchQuery] = React.useState('');
    const [data, setData] = React.useState(hotelMenu);

    const filterMenuItems = (text) => {
        const filteredData = Object.keys(hotelMenu).reduce((acc, category) => {
            const filtered = hotelMenu[category].filter(item =>
                item?.name.toLowerCase().includes(text.toLowerCase())
            );
            if (filtered?.length > 0) {
                acc[category] = filtered;
            }
            return acc;
        }, {});
        setData(filteredData ?? []);
    };

    const addItem = (id) => {
        setCart(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const removeItem = (id) => {
        setCart(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) - 1)
        }));
    };


    return (

        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hotel Menu</Text>
                <CartIcon width={30} height={30} color="black" />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {Object.values(cart).reduce((a, b) => a + b, 0)}
                </Text>

            </View>
            <TouchableOpacity onPress={async () => {
                // await clearLocalStore();
                await removeFromLocalStore('userSession');
                logedContext.resetContext();
            }} style={{ position: 'absolute', top: 40, right: 10, padding: 5 }}>
                <LogoutIcon width={30} height={30} color="black" />
            </TouchableOpacity>
            <View style={{ width: width * 0.9, marginBottom: 10, marginTop: 20, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10 }}>
                <TextInput
                    placeholder="Search menu items..."
                    placeholderTextColor={'gray'}
                    value={searchQuery}
                    onChangeText={(text) => { filterMenuItems(text); setSearchQuery(text); }}
                    style={{ paddingHorizontal: 10, paddingVertical: 8, fontSize: 16, color: 'black', flex: 1 }}
                />
                <TouchableOpacity style={{ padding: 5 }}>
                    <SearchIcon width={30} height={30} color="grey" />
                </TouchableOpacity>
            </View>
            <SectionList
                showsVerticalScrollIndicator={false}
                style={{ width: width * 0.9, marginTop: 20 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                sections={[
                    { title: 'Appetizers', data: data?.appetizers ?? [] },
                    { title: 'Main Courses', data: data?.mainCourses ?? [] },
                    { title: 'Desserts', data: data?.desserts ?? [] },
                    { title: 'Beverages', data: data?.beverages ?? [] }
                ]}
                keyExtractor={(item) => item.id.toString()}
                renderSectionHeader={({ section }) => (
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{section.title}</Text>
                )}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: '100%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: item.imageUrl }} style={{ width: 60, height: 60, borderRadius: 5, marginRight: 10 }} />
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                                <Text style={{ fontSize: 16 }}>{item.price}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <TouchableOpacity onPress={() => addItem(item.id)}>
                                <PlusIcon width={30} height={30} color="green" onPress={() => addItem(item.id)} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', minWidth: 30, textAlign: 'center' }}>{cart[item.id] || 0}</Text>
                            <TouchableOpacity onPress={() => removeItem(item.id)}>
                                <MinusIcon width={30} height={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

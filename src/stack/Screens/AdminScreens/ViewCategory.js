import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db_Firebase } from '../../../common/CommonFunctions';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from '@react-native-firebase/firestore';


export const ViewCategory = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const snapshot = await getDocs(collection(db_Firebase, 'categories'));
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        Alert.alert('Delete', 'Are you sure?', [
            { text: 'Cancel' },
            {
                text: 'Delete', onPress: async () => {
                    await deleteDoc(doc(db_Firebase, 'categories', id));
                    fetchCategories();
                }, style: 'destructive'
            }
        ]);
    };

    const handleEdit = (item) => {
        // Navigation logic to an edit screen or modal would go here
        Alert.alert('Edit', `Edit functionality for ${item.categoryName}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Manage Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <View>
                            <Text style={styles.itemTitle}>{item.categoryName}</Text>
                            <Text style={styles.itemSub}>ID: {item.categoryId} | Foods: {item.foodCount}</Text>
                        </View>
                        <View style={styles.actionRow}>
                            <TouchableOpacity onPress={() => handleEdit(item)}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
    addButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    itemCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    itemTitle: { fontSize: 18, fontWeight: '600' },
    itemSub: { color: '#666', fontSize: 14 },
    actionRow: { flexDirection: 'row' },
    editText: { color: '#007bff', marginRight: 15, fontWeight: '500' },
    deleteText: { color: '#dc3545', fontWeight: '500' }
});

export default ViewCategory;

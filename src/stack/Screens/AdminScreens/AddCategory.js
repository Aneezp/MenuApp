import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db_Firebase } from '../../../common/CommonFunctions';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from '@react-native-firebase/firestore';

export const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const handleAddCategory = async () => {
        if (!categoryName || !categoryId) return Alert.alert('Error', 'Please fill all fields');
        try {
            await addDoc(collection(db_Firebase, 'categories'), {
                categoryId,
                categoryName,
                foodCount: 0,
            });
            setCategoryName('');
            setCategoryId('');
            Alert.alert('Success', 'Category added successfully');
        } catch (e) {
            Alert.alert('Error', e.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Category</Text>
            <TextInput
                style={styles.input}
                placeholder="Category ID"
                value={categoryId}
                onChangeText={setCategoryId}
            />
            <TextInput
                style={styles.input}
                placeholder="Category Name"
                value={categoryName}
                onChangeText={setCategoryName}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                <Text style={styles.buttonText}>Save Category</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
    addButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    itemCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2 },
    itemTitle: { fontSize: 18, fontWeight: '600' },
    itemSub: { color: '#666', fontSize: 14 },
    actionRow: { flexDirection: 'row' },
    editText: { color: '#007bff', marginRight: 15, fontWeight: '500' },
    deleteText: { color: '#dc3545', fontWeight: '500' }
});

export default AddCategory;

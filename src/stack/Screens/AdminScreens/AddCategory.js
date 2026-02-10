import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db_Firebase, getID } from '../../../common/CommonFunctions';
import { collection, doc, getDocs, setDoc } from '@react-native-firebase/firestore';
import { TextInputComponet } from '../CommonComponents';

export const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');
    const [nextId, setNextID] = useState(100)

    useEffect(() => {
        getId()
    }, []);

    const getId = async () => {
        const ids = await getID(nextId, 'categories')
        setNextID(ids)
    }

    const handleAddCategory = async () => {
        if (!categoryName || !nextId) return Alert.alert('Error', 'Please fill all fields');
        try {
            const res = await setDoc(doc(db_Firebase, 'categories', String(nextId)), {
                categoryName: categoryName,
                description: categoryDesc,
                foodCount: 0
            }).then((res) => {
                console.log(res, '-success');
                setCategoryName('');
                setNextID('')
                getID()
            }).catch((e) => {
                console.log(e, '-error');
            });

            Alert.alert('Success', 'Category added successfully');
        } catch (e) {
            Alert.alert('Error', e.message)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Add New Category</Text>
            <TextInputComponet onChange={(text) => { setCategoryName(text) }} value={categoryName} mariginTop title={'Category'} placeHolder={"Category Name"} style={{ marginBottom: 10, width: '100%' }} />
            <TextInputComponet height={'auto'} multiline onChange={(text) => { setCategoryDesc(text) }} value={categoryDesc} mariginTop title={'Description'} placeHolder={"Enter Description"} style={{ marginBottom: 10, width: '100%' }} />
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

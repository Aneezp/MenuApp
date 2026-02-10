import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Modal } from 'react-native';
import { db_Firebase } from '../../../common/CommonFunctions';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from '@react-native-firebase/firestore';
import { PlusIcon } from '../../../Components/Svg';
import { TextInputComponet } from '../CommonComponents';


export const ViewCategory = () => {
    const [categories, setCategories] = useState([]);
    const [editModal, setEditModal] = useState(false)
    const [editItem, setEditItem] = useState(false)

    const [categoryName, setCategoryName] = useState('');
    const [viewMore, setViewMore] = useState(false);
    const [categoryDesc, setCategoryDesc] = useState('');

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
        setEditModal(true)
        setEditItem(item)
        setCategoryName(item?.categoryName)
        setCategoryDesc(item?.description ?? '')
    };

    const handleAddCategory = async () => {
        if (!categoryName) return Alert.alert('Error', 'Please fill all fields');
        try {
            const res = await updateDoc(doc(db_Firebase, 'categories', editItem?.id), {
                categoryName: categoryName,
                description: categoryDesc
            }).then((res) => {
                console.log(res, '-success');
                setCategoryName('');
                setEditModal(false)
                setEditItem({})
                fetchCategories()
                Alert.alert('Success', 'Category added successfully');
            }).catch((e) => {
                console.log(e, '-error');
            });

        } catch (e) {
            Alert.alert('Error', e.message)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Manage Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <TouchableOpacity disabled={!item.description} onPress={() => { setViewMore(true); setEditItem(item) }} style={{ width: '70%' }}>
                            <Text style={styles.itemTitle}>{item.categoryName}</Text>
                            <Text style={styles.itemSub}>Foods: {item.foodCount}</Text>
                            {item.description && <Text numberOfLines={1} style={styles.itemSub}>{item.description}</Text>}
                        </TouchableOpacity>
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
            <Modal visible={viewMore} onRequestClose={() => { setViewMore(false); setEditItem('') }} >
                <View style={{ backgroundColor: '#2423232a', flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <View style={{ backgroundColor: 'white', width: "90%", borderRadius: 10, padding: 30 }}>
                        <TouchableOpacity onPress={() => { setViewMore(false); setEditItem('') }} style={{ alignSelf: "flex-end", transform: [{ rotate: '45deg' }], marginRight: -10, marginTop: -20 }}>
                            <PlusIcon />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: "center", gap: 10 }} >
                            <Text style={styles.itemTitle}>{editItem.categoryName}</Text>
                            <Text style={styles.itemSub}>Foods: {editItem.foodCount}</Text>
                        </View>
                        {editItem.description && <Text style={styles.itemSub}>{editItem.description}</Text>}
                    </View>
                </View>
            </Modal>
            <Modal visible={editModal} onRequestClose={() => { setEditModal(false); setEditItem('') }} >
                <View style={{ backgroundColor: '#2423232a', flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <View style={{ backgroundColor: 'white', width: "90%", borderRadius: 10, padding: 30 }}>
                        <TouchableOpacity onPress={() => { setEditModal(false); setEditItem('') }} style={{ alignSelf: "flex-end", transform: [{ rotate: '45deg' }], marginRight: -10, marginTop: -20 }}>
                            <PlusIcon />
                        </TouchableOpacity>
                        <Text style={styles.header}>Edit category {editItem?.categoryName}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Category Name"
                            value={categoryName}
                            onChangeText={setCategoryName}
                        />
                        <TextInputComponet height={'auto'} multiline onChange={(text) => { setCategoryDesc(text) }} value={categoryDesc} mariginTop title={'Description'} placeHolder={"Enter Description"} style={{ marginBottom: 10, width: '100%' }} />

                        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                            <Text style={styles.buttonText}>Save Category</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

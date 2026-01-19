import React, { useState, useEffect } from 'react'

import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CommonButton, HeaderComponent, ImageUploadComponent, TextInputComponet } from '../CommonComponents'
import { ImageIcon } from '../../../Components/Svg'
import { db_Firebase, toast } from '../../../common/CommonFunctions'
import { doc, setDoc } from '@react-native-firebase/firestore'
const AddMenu = ({ route, ...props }) => {
    const [linkUpload, setLinkUpload] = useState(true)
    const [image, setImage] = useState('')
    const [imageBase64, setImageBase64] = useState('')

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [link, setLink] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        if (route.params?.itemToEdit) {
            const { name, price, image, linktype } = route.params.itemToEdit;
            setName(name);
            setPrice(price);

            if (linktype === 'image') {
                setImageBase64(image);
                setLinkUpload(false);
                setImage(`data:image/jpeg;base64,${image}`);
            } else {
                setLink(image);
                setLinkUpload(true);
            }
        }
    }, [route.params?.itemToEdit]);

    // const docRef = collection(db_Firebase, "menu");
    const createMenu = async () => {
        console.log('menu');
        const imgORlink = linkUpload ? link == '' : imageBase64 == ''
        if (name != '' || price != '' || !imgORlink) {
            const res = await setDoc(doc(db_Firebase, 'menu', name), {
                name: name,
                price: price,
                image: linkUpload ? link : imageBase64,
                linktype: linkUpload ? 'link' : 'image',
                category: category

            }).then((res) => {
                console.log(res, '-success');
                toast('Menu created successfully')
            }).catch((e) => {
                console.log(e, '-error');
            });
            // toast('Menu created successfully')


        }
        else {
            console.log(name, '--', price, linkUpload ? link : imageBase64);
            toast('fields cannot be empty')
        }

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent title={route.params?.itemToEdit ? "Update Menu" : "Add Menu"} />
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 10, gap: 10 }}>
                {/* <ImageIcon /> */}
                <TextInputComponet onChange={(text) => { setName(text) }} value={name} mariginTop title={'Name'} placeHolder={'Enter name of item'} />
                <TextInputComponet type='number' onChange={(text) => setPrice(text)} value={price} mariginTop title={'Price'} placeHolder={'Enter price'} />
                {/* <TextInputComponet type='number' onChange={(text) => setCategory(text)} value={category} mariginTop title={'Category'} placeHolder={'Enter Category'} /> */}

                {linkUpload ? <TextInputComponet onChange={setLink} value={link} mariginTop title={'Image Link'} placeHolder={'Enter image url here..'} Icon={<ImageIcon />} />
                    :
                    <ImageUploadComponent mariginTop title={'Image upload'} Icon={<ImageIcon />} setImage={setImage} image={image} setImageBase64={setImageBase64} />}
                <TouchableOpacity onPress={() => { setLinkUpload(!linkUpload); setImage('') }} style={{ alignSelf: 'flex-start', marginLeft: 10, width: '100%' }}>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>{linkUpload ? 'Upload Image instead' : 'Proceed with link'}</Text>
                </TouchableOpacity>
                <CommonButton title={route.params?.itemToEdit ? 'Update Menu' : 'Create Menu'} onPress={() => {
                    createMenu()
                }} />
            </View>
        </SafeAreaView>
    )
}

export default AddMenu
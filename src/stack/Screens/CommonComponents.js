import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import ImagePicker from "react-native-image-crop-picker";

export const HeaderComponent = ({ ...props }) => {
    const { title, LeftIcon = null, number } = props

    return (
        <View>
            <View style={{ height: 60, width: '100%', backgroundColor: 'white', alignItems: "center", justifyContent: "center", gap: 10, flexDirection: "row" }} >
                {LeftIcon && <LeftIcon />}
                <Text style={{ color: "Black", fontSize: 24, fontWeight: 'bold' }} >{title}</Text>
                {number && <Text style={{ color: "Black", fontSize: 18, fontWeight: 'bold' }} >{number}</Text>}
            </View>
            <View style={{ height: 2, backgroundColor: "#4948480e", marginBottom: 1 }} />
        </View>
    )
}

export const TextInputComponet = ({ title, mariginTop = false, Icon = null, onChange, value, placeHolder, type = 'default' }) => {
    return (
        <View style={{
            width: '95%', height: 75, borderRadius: 10, marginTop: mariginTop ? 10 : 0, shadowColor: '#f50c0cff', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 3
        }}>
            <Text style={{ color: 'black', marginTop: 5, marginLeft: 5, marginBottom: 4 }}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', borderRadius: 10, borderWidth: 0.5, paddingHorizontal: Icon ? 10 : 0, }}>
                {Icon && Icon}
                <TextInput keyboardType={type} autoCorrect={false} style={{ height: 47, textAlign: 'left', paddingHorizontal: 10, width: Icon ? '80%' : '100%' }}
                    onChangeText={onChange} value={value} placeholder={placeHolder} placeholderTextColor={'#6f6a6dff'}
                />
            </View>
        </View>
    )

}

export const CommonButton = ({ onPress, title = '' }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ width: "95%", backgroundColor: '#007AFF', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity >
    )
}

export const ImageUploadComponent = ({ title, mariginTop = false, Icon = null, setImage, image, setImageBase64 }) => {

    const openImagePicker = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then((image) => {
            setImage(image.path)
            setImageBase64(image.data)
            // console.log(image);
        }).catch((err) => {
            console.log(err, 'img err');

        });
    }
    const cleanImage = async () => {
        await ImagePicker.cleanSingle(image).then((res) => {
            console.log(res, '---img clean');

        }).catch((err) => {
            console.log(err, 'cln img err');

        })
    }
    return (
        <TouchableOpacity onPress={openImagePicker} style={{
            width: '95%', height: image ? 230 : 75, borderRadius: 10, marginTop: mariginTop ? 10 : 0
        }}>
            <Text style={{ color: 'black', marginTop: 5, marginLeft: 5, marginBottom: 4 }}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', borderRadius: 10, borderWidth: 0.5, paddingHorizontal: Icon ? 10 : 0, }}>
                {Icon && Icon}
                <View style={{ height: 47, textAlign: 'left', paddingHorizontal: 10, width: Icon ? '80%' : '100%', alignItems: 'center', justifyContent: "center" }} >
                    <Text style={{ color: '#6f6a6dff', fontSize: 12.5, fontWeight: '400', alignSelf: "flex-start" }}>{image ? "Press here to choose new image" : 'Press here to choose image'}</Text>
                </View>
            </View>
            {image != '' && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' }}>
                <Image width={147} height={147} style={{ marginTop: 10, borderRadius: 5, borderWidth: 0.5, borderColor: '#6f6a6dff' }} source={{ uri: image }} />
                <TouchableOpacity onPress={() => { cleanImage(); setImage('') }} style={{ borderWidth: 0.4, borderRadius: 4, alignItems: "center", justifyContent: 'center', paddingHorizontal: 12 }} >
                    <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', alignSelf: "flex-start" }}>Clear</Text>
                </TouchableOpacity>
            </View>}
        </TouchableOpacity>
    )
}
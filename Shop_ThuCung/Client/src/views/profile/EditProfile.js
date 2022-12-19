import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { getStorage, uploadString, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import { saveUserField } from '../../../redux/actions/authAction';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditProfile({route}) {
    const dispatch = useDispatch();
    const db = useSelector((store) => store.products);

    const { id } = route.params;
    const { name } = route.params;
    const { phone } = route.params;
    const { email } = route.params;
    const { birthday } = route.params;
    const { imageURL } = route.params;
    const { address } = route.params;

    const navigation = useNavigation()
    //date
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        console.log(fDate);
        setEditBirthDay(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }
    const [EditImage, setEditImage] = useState(imageURL)
    const [EditName, setEditName] = useState(name)
    const [EditEmail, setEditEmail] = useState(email)
    const [EditMobile, setEditMobile] = useState(phone)
    const [EditBirthDay, setEditBirthDay] = useState(birthday)
    const [EditAddress, setEditAddress] = useState(address)

    const onSave = () => {
        saveUserField(EditName, EditImage, EditEmail, EditMobile, EditBirthDay, EditAddress)
            .then(() => navigation.goBack())
    }

    const [selectedImage, setSelectedImage] = useState({ localUri: imageURL })
    const openImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({ base64: true })
        if (result.canceled)
            return;
        let uri = result.uri;
        setSelectedImage({ localUri: result.uri });
        if (Platform.OS === 'web') {
            let base64code = result.base64;
            //upload
            await uploadBase64(base64code);
        } else {
            //device
            // let uri = result.uri
            console.log(result)
            console.log('uri', result.uri)
            //step 1 -> convert uri --: blob
            const blobfile = await convertURI2BlobFile(result.uri)
            console.log('blobfile', blobfile)
            //step 2 -> upload to cloud
            await uploadFile(blobfile);
        }
    }

    const convertURI2BlobFile = async (uri) => {
        const result = await new Promise((resolve, reject) => {
            let xmlRequest = new XMLHttpRequest();
            xmlRequest.onload = function () {
                resolve(xmlRequest.response);
            }
            xmlRequest.onerror = function () {
                console.log("error here")
            }
            xmlRequest.responseType = "blob";
            xmlRequest.open("GET", uri, true);
            xmlRequest.send(null)
        })
        return result;
    }

    const uploadFile = async (blobfile) => {
        let imgName = 'img-ios' + new Date().getTime();
        //step 2
        let storage = getStorage();
        let storageref = ref(storage, `imageProfiles/${imgName}.jpg`)
        let metadata = {
            contentType: 'image/jpeg'
        }
        const uploadTask = uploadBytesResumable(storageref, blobfile, metadata);
        uploadTask.on('state_changed',
            (snapshot) => { },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {
                        setEditImage(downloadURL)
                        console.log('File available at', downloadURL);
                    })
            })
    }

    const uploadBase64 = async (base64code) => {
        let imgName = 'img-w' + new Date().getTime();
        //step 2
        let storage = getStorage();
        let storageref = ref(storage, `imageProfiles/${imgName}.jpg`)
        let metadata = {
            contentType: 'image/jpeg'
        }
        uploadString(storageref, base64code, 'base64', metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (downloadURL) => {
                        setEditImage(downloadURL)
                        console.log('File available at', downloadURL);
                    })
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageViewContainer}
                    onPress={() => openImage()}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: selectedImage.localUri }} />
                    <View style={styles.imageOverlay}>
                        <Feather name='camera' size={26} color='white' />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <Text style={styles.title}>Ảnh Người Dùng</Text>
                <TextInput
                    value={EditImage}
                    onChangeText={setEditImage}
                    placeholder='Link Ảnh Người Dùng'
                    editable={false}
                    style={styles.textInput} />

                <Text style={styles.title}>Tên Người Dùng</Text>
                <TextInput
                    value={EditName}
                    onChangeText={setEditName}
                    placeholder='Tên Người Dùng'
                    style={styles.textInput} />

                <Text style={styles.title}>Email Người Dùng</Text>
                <TextInput
                    value={EditEmail}
                    onChangeText={setEditEmail}
                    placeholder='Email Người Dùng'
                    style={styles.textInput} />

                <Text style={styles.title}>SĐT Người Dùng</Text>
                <TextInput
                    value={EditMobile}
                    onChangeText={setEditMobile}
                    placeholder='SĐT Người Dùng'
                    style={styles.textInput} />

                <Text style={styles.title}>Địa Chỉ Người Dùng</Text>
                    <TextInput
                        value={EditAddress}
                        onChangeText={setEditAddress}
                        placeholder='Địa Chỉ Người Dùng'
                        style={styles.textInput} />

                <Text style={styles.title}>Sinh Nhật Người Dùng</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        value={EditBirthDay}
                        onChangeText={setEditBirthDay}
                        placeholder='SĐT Người Dùng'
                        style={styles.textInput} 
                        editable={false}
                        />
                    <TouchableOpacity
                        onPress={() => showMode('date')}>
                        <MaterialIcons name="date-range" size={24} color="black" />
                    </TouchableOpacity>

                    {show && (
                        <DateTimePicker 
                            testID='dateTimePicker'
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display='spinner'
                            onChange={onChange}
                        />
                    )}
                </View>

                <TouchableOpacity
                    style={styles.grayOutlinedButton}
                    onPress={onSave}>
                    <Text style={styles.grayOutlinedButtonText}>Cập Nhật Hồ Sơ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'white'
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    imageViewContainer: {
        backgroundColor: 'white',
        height: 180,
        width: 180,
        borderRadius: 90,
        borderWidth: 5,
        borderColor: 'black',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        backgroundColor: 'white',
        height: 180,
        width: 180,
        position: 'absolute'
    },
    imageOverlay: {
        marginTop: 90,
        marginLeft: 90
    },

    fieldsContainer: {
        marginTop: 20,
        padding: 20,
        flex: 1
    },
    fieldItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldValueContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainContainer: {
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        color: 'black',
    },
    textInput: {
        borderColor: 'lightgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        paddingVertical: 5,
        marginBottom: 20
    },
    grayOutlinedButtonText: {
        color: 'black',
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center'
    },
    grayOutlinedButton: {
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

    },
});
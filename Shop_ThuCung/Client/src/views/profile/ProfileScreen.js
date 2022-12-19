import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useUser } from './useUser'
import { useNavigation } from '@react-navigation/native'
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../src/const/colors';
export default function ProfileScreen({route}) {
    const navigation = useNavigation()
    const { initialUserId } = route.params
    const [userPosts, setUserPosts] = useState([])
   
    // const currentUser = useSelector(state => state.auth.currentUser)
    const admin = useSelector((state) => state.user && state.user.currentUser && state.user.currentUser.isAdmin)
    const user = useUser(initialUserId ? initialUserId : providerUserId).data;
    useEffect(() => {
        if (user === undefined) {
            return;
        }
    }, [user])

    if (user === undefined) {
        return <></>
    }

    const userSignOut = () => {
        firebase.auth().signOut()
    }

    return (
        <View style={styles.container}>
          
            <View style={styles.containerNav}>
 
            <Icon
              name="arrow-left"
              size={28}
              color={COLORS.dark}
              onPress={navigation.goBack}
            />
            <Icon/>
     
                <Text style={styles.text}>Thông tin</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('editProfile', {
                        id: user.uid,
                        name: user.name,
                        phone: user.phone,
                        email: user.email,
                        birthday: user.birthday,
                        imageURL: user.imageURL,
                        address: user.address
                    })}>
                    <FontAwesome5 name="user-edit" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* container */}
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <View style={styles.imageViewContainer} >
                        <Image
                            style={styles.image}
                            source={{ uri: user.imageURL }}
                        />
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>{user.name}</Text>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.fieldsContainer}>
                    {/* <View style={styles.fieldItemContainer}>
                        <Text style={styles.Title}>Tên</Text>               
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.Data}>{user.name}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldItemContainer}>
                        <Text style={styles.Title}>Email</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.Data}>{user.email}</Text>
                        </View>
                    </View> */}

                    <View style={styles.fieldItemContainer}>
                        <Text style={styles.Title}>Ngày Sinh</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.Data}>{user.birthday}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldItemContainer}>
                        <Text style={styles.Title}>SĐT</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.Data}>{user.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldItemContainer}>
                        <Text style={styles.Title}>Địa Chỉ</Text>
                        <View style={styles.fieldValueContainer}>
                            <Text style={styles.Data}>{user.address}</Text>
                        </View>
                    </View>
                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../../assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../../assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.btn}>
                    <TouchableOpacity 
                    onPress={userSignOut}>
                     <Text style={styles.btntext1}>Đăng xuất khỏi ứng dụng</Text>
                    <MaterialCommunityIcons name="logout" style={styles.icon1} size={32} color="black" justifyContent= "center"/>
                </TouchableOpacity>
                </View>
                </View>
                </View>
          
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white'
    },
    containerNav: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    text: {
        fontSize: 20,
        color: 'black',
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        
    },
    containerContent: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    imageViewContainer: {
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
        // alignItems: 'center',
        // flex: 1
    },
    fieldItemContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldValueContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    Title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    Data: {
        fontSize: 15,
    },

    // Image
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    btn:{
        width:"80%",
        height:"30%",
        backgroundColor: "#0077c2",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginLeft:50,
        marginTop:20
    },
    btntext1: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems: "center",
    },
    icon1: {
        justifyContent: "center",
        alignItems: "center",
    },
});
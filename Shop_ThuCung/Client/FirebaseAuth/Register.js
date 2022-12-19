import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Image } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { container, form } from '../components/Styles/styles';

const Pet_LOGO =
  "https://bizweb.dktcdn.net/100/147/060/files/petshop.jpg?v=1479734120094";

export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(true);

    const onRegister = () => {
        if (name.lenght == 0 || username.lenght == 0 || email.length == 0 || password.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }
        firebase.firestore()
            .collection('users')
            .where('username', '==', username)
            .get()
            .then((snapshot) => {

                if (!snapshot.exist) {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then((result) => {
                            if (snapshot.exist) {
                                return
                            }
                            firebase.firestore().collection("users")
                                .doc(firebase.auth().currentUser.uid)
                                .set({
                                    name,
                                    email,
                                    username,
                                    imageURL: 'https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png',
                                    phone: '',
                                    address: '',
                                    birthday: ''
                                })
                            console.log(result)
                        })
                        .catch((error) => {
                            setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
                            console.log(error)
                        })
                }
            }).catch(() => {
                setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
            })

    }

    return (
        <View style={container.center}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: Pet_LOGO, height: 100, width: "100%" }} />
            </View>

            <View style={container.formCenter}>
                <TextInput
                    style={form.textInput}
                    placeholder="Username"
                    value={username}
                    keyboardType="twitter"
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
                <TextInput
                    style={form.textInput}
                    placeholder="name"
                   
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={form.textInput}
                    placeholder="email"
                  
                    onChangeText={(email) => setEmail(email)}
                    
                />
                <TextInput
                    style={form.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <Button
                    style={form.button}
                    onPress={() => onRegister()}
                    title="Register"
                />
            </View>

            <View style={form.bottomButton} >
                <Text
                    onPress={() => props.navigation.navigate("Login")} >
                    Already have an account? SignIn.
                </Text>
            </View>
            <Snackbar
                visible={isValid.boolSnack}
                duration={100}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                {isValid.message}
            </Snackbar>
        </View>

    )
}

const styles = StyleSheet.create({
    logoContainer: {
        height: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200
    }
})

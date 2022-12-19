import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { container, form } from "../components/Styles/styles";
import Icon from "react-native-vector-icons/FontAwesome";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        style={styles.bgContainer}
        source={require("../assets/bgpet.jpg")}
        resizeMode="stretch"
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>PET SHOP</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 5, marginTop: 3 }}>
              <Icon name="user" size={38} color="#c2185b" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput placeholder="email" 
              style={styles.inputText} 
              onChangeText={email => setEmail(email)}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 5, marginTop: 3 }}>
              <Icon name="lock" size={40} color="#c2185b" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                style={styles.inputText}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onSignIn()}
            >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => props.navigation.navigate("Register")}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  //   logoContainer: {
  //     height: 250,
  //     flexDirection: "row",
  //     alignItems: "center",
  //     justifyContent: "center"
  //   },
  //   logo: {
  //     width: 200,
  //     height: 200
  //   },
  loginContainer: {
    flex: 1
  },
  bgContainer: {
    flex: 1,
    alignItems: "center"
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20
  },
  title: {
    color: "#37474f",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "italic"
  },
  formContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    marginTop: 260
  },
  inputContainer: {
    width: "60%"
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "#b71c1c",
    paddingVertical: 5,
    marginBottom: 10
  },
  btn: {
    backgroundColor: "#b71c1c",
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45 / 2,
    marginTop: 15
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22
  }
});

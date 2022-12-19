import React, { useState } from "react";
import {
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { postPet } from "../redux/actions/petActions";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { firebase } from "../config/firebase";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const CreatePet = ({ navigation }) => {
  const dispatch = useDispatch();
  const db = useSelector((store) => store.pets);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [cateID, setcateID] = useState(0);
  const [origin, setOrigin] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [Img, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpEvEl5W56tlV7E2SCnU5mROtuj0L8XxOjpeZz11WyM27qqXF66-hAxDUWq5_9fLQkKc&usqp=CAU"
  );

  const save = () => {
    let newPet = {
      Name: name,
      Age: age,
      Gender: gender,
      CateID: cateID,
      Origin: origin,
      Price: price,
      Condition: condition,
      Image: selectedImage.localURI,
    };
    dispatch(postPet(newPet));
    navigation.navigate("ViewAllPet");
  };
  const [selectedImage, setSelectedImage] = useState({ localURI: Img });
  const openImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (result.cancelled) return;

    let uri = result.uri;

    if (Platform.OS === "web") {
      let base64code = result.base64;
      //upload
      await uploadBase64(base64code);
    } else {
      let uri = result.uri;
      //step1 -> convert uri --> blob
      const blobFile = await convertURI2BlobFile(uri);
      //step2 --> upload to cloud
      await uploadFile(blobFile);
    }
  };
  const convertURI2BlobFile = async (uri) => {
    const result = await new Promise((resolve, reject) => {
      let xmlRequest = new XMLHttpRequest();
      xmlRequest.onload = function () {
        resolve(xmlRequest.response);
      };
      xmlRequest.onerror = function () {
        reject(new TypeError("Request failed"));
      };
      xmlRequest.responseType = "blob";
      xmlRequest.open("GET", uri, true);
      xmlRequest.send(null);
    });
    return result;
  };
  const uploadFile = async (blobFile) => {
    let imgname = "img-android-" + new Date().getTime();
    //step2
    let storage = getStorage();
    let storageRef = ref(storage, `images/${imgname}.jpg`);
    let metadata = { contentType: "image/jpeg" };

    const uploadTask = uploadBytesResumable(storageRef, blobFile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("downloadURL", downloadURL);
          setSelectedImage({ localURI: downloadURL });
        });
      }
    );
  };
  const uploadBase64 = async (base64code) => {
    let imgname = "img-w-" + new Date().getTime();
    //step2
    let storage = getStorage();
    let storageRef = ref(storage, `images/${imgname}.jpg`);
    let metadata = { contentType: "image/jpeg" };
    uploadString(storageRef, base64code, "base64", metadata).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("downloadURL", downloadURL);
          setSelectedImage({ localURI: downloadURL });
        });
      }
    );
  };

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
        source={require("../assets/BK.jpg")}
        resizeMode="cover"
        style={styles.bgContainer}
      >
        <Image source={{ uri: selectedImage.localURI }} style={styles.img} />
        <View style={styles.logoLogin}>
          <Ionicons name="create" color="#FFF" size={36} />
        </View>
        <Text style={styles.signinText}>ADD PET</Text>
        <ScrollView style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Cate ID"
              style={styles.inputText}
              onChangeText={(val) => setcateID(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Pet Name"
              style={styles.inputText}
              onChangeText={(val) => setName(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Pet Age"
              style={styles.inputText}
              onChangeText={(val) => setAge(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Pet Gender"
              style={styles.inputText}
              onChangeText={(val) => setGender(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Pet Origin"
              style={styles.inputText}
              onChangeText={(val) => setOrigin(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Pet Price"
              style={styles.inputText}
              onChangeText={(val) => setPrice(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Pet Condition"
              style={styles.inputText}
              onChangeText={(val) => setCondition(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Hình ảnh"
              style={styles.inputText}
              value={selectedImage.localURI}
            />
            <TouchableOpacity style={styles.btnImage} onPress={openImage}>
              <Text style={{ color: "white" }}>Choose image</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => save()}>
            <Text style={styles.btnTxt}>Add pet</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default CreatePet;
const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  logoLogin: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#d81b60",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
  signinText: {
    color: "#d81b60",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
  },
  formContainer: {
    width: "80%",
    marginBottom: 10,
    marginLeft: 80,
    // alignItems: "center",
    // justifyContent: "center",
    //paddingTop: 20,
  },
  inputContainer: {
    width: "70%",
    marginBottom: 10,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "#d81b60",
    paddingVertical: 10,
    color: "#000",
    paddingLeft: 15,
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#d81b60",
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  btnTxt: {
    color: "#FFF",
  },
  bgContainer: {
    flex: 1,
    alignItems: "center",
  },
  btnImage: {
    backgroundColor: "#d81b60",
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30,
  },
});

import React, { useState, useEffect } from "react";
import {
  Platform,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { updatePet, deletePet, fetchAllPet } from "../redux/actions/petActions";
import { firebase } from "../config/firebase";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

const EditPet = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const db = useSelector((store) => store.pets);

  const { petCID } = route.params;
  const { petId } = route.params;
  console.log(petId);
  const { petName } = route.params;
  const { petAge } = route.params;
  const { petGender } = route.params;
  const { petOrigin } = route.params;
  const { petPrice } = route.params;
  const { petCondition } = route.params;
  const { petImage } = route.params;

  const [docId, setdocId] = useState(petId);

  const [cateId, setCId] = useState(petCID);
  const [name, setName] = useState(petName);
  const [age, setAge] = useState(petAge);
  const [gender, setGender] = useState(petGender);
  const [price, setPrice] = useState(petPrice);
  const [condition, setCondition] = useState(petCondition);
  const [origin, setOrigin] = useState(petOrigin);

  useEffect(() => {
    dispatch(fetchAllPet());
    console.log("db", db);
  }, []);

  const handleUpdate = (docId) => {
    let newFood = {
      CateID: cateId,
      Name: name,
      Age: age,
      Gender: gender,
      Condition: condition,
      Price: price,
      Origin: origin,
      Image: selectedImage.localURI,
    };
    console.log("newFood", newFood);

    dispatch(updatePet(docId, newFood));
    dispatch(fetchAllPet());
    console.log("db", db);
    navigation.navigate("ViewAllPet");
  };
  // const del = (docId) => {
  //   dispatch(deletePet(docId));
  //   dispatch(fetchAllPet());
  //   navigation.navigate("ViewAllPet");
  // };

  const [selectedImage, setSelectedImage] = useState({ localURI: petImage });
  const openImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (result.cancelled) return;
    // console.log(result)
    let uri = result.uri;
    // setSelectedImage({ localURI: result.uri });
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
    let imgname = "img-android" + new Date().getTime();
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BK.jpg")}
        resizeMode="cover"
        style={styles.bgContainer}
      >
        <Image source={{ uri: selectedImage.localURI }} style={styles.img} />
        <View style={styles.logoLogin}>
          <Ionicons name="create" color="#FFF" size={36} />
        </View>
        <Text style={styles.signinText}>Edit Pet</Text>
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity onPress={openImage} style={styles.btnChoose}>
            <Text style={{ marginLeft: 60 }}>Choose Image</Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="name"
              defaultValue={petName}
              value={name}
              style={styles.inputText}
              onChangeText={(val) => setName(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="price"
              defaultValue={petPrice}
              value={price}
              style={styles.inputText}
              onChangeText={(val) => setPrice(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="petGender"
              defaultValue={petGender}
              value={gender}
              style={styles.inputText}
              onChangeText={(val) => setGender(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="age"
              defaultValue={petAge}
              value={age}
              style={styles.inputText}
              onChangeText={(val) => setAge(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="condition"
              defaultValue={petCondition}
              value={condition}
              style={styles.inputText}
              onChangeText={(val) => setCondition(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="origin"
              defaultValue={petOrigin}
              value={origin}
              style={styles.inputText}
              onChangeText={(val) => setOrigin(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Hình ảnh"
              style={styles.inputText}
              value={selectedImage.localURI}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleUpdate(docId)}
          >
            <Text style={styles.btnTxt}>Update</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btn} onPress={() => del(docId)}>
            <Text style={styles.btnTxt}>Delete</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EditPet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logoLogin: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: "#d81b60",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  formContainer: {
    width: "80%",
    marginBottom: 10,
    marginLeft: 80,
  },
  signinText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
    color: "#d81b60",
  },
  title: {
    fontSize: 20,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  btn: {
    backgroundColor: "#d81b60",
    width: "70%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  btnTxt: {
    fontSize: 14,
    color: "white",
  },
  inputContainer: {
    width: "70%",
    marginBottom: 10,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "#d81b60",
    paddingVertical: 10,
    flexWrap: "wrap",
    paddingLeft: 15,
    color: "black",
  },
  bgContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  btnChoose: {},
});

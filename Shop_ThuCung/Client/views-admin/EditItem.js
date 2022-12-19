import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
//import Ionicons from "react-native-vector-icons/Ionicons";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  updateItem,
  removeItem,
  fetchAllItem,
} from "../redux/actions/itemActions";

const EditItem = ({ navigation, route }) => {
  const { productId } = route.params;
  const { productName } = route.params;
  const { productCId } = route.params;
  const { productImage } = route.params;
  const { productPrice } = route.params;
  const { productQuantity } = route.params;

  const [docId, setdocId] = useState(productId);
  const [id, setCId] = useState(productCId);
  const [name, setName] = useState(productName);
  const [quantity, setQuantity] = useState(productQuantity);
  const [price, setPrice] = useState(productPrice);

  const dispatch = useDispatch();
  const db = useSelector((store) => store.items);

  useEffect(() => {
    dispatch(fetchAllItem());
    console.log("db", db);
  }, []);

  const handleUpdate = (docId) => {
    let item = {
      cateID: id,
      name: name,
      price: price,
      quantity: quantity,
      image: selectedImage.localURI,
    };
    dispatch(updateItem(docId, item));
    dispatch(fetchAllItem());
    navigation.navigate("ViewAllItem");
  };

  const del = (docId) => {
    dispatch(removeItem(docId));
    //dispatch(fetchAllItem());
    navigation.navigate("ViewAllItem");
  };

  const [selectedImage, setSelectedImage] = useState({
    localURI: productImage,
  });
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
              placeholder="product Name"
              defaultValue={productName}
              value={name}
              style={styles.inputText}
              onChangeText={(val) => setName(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="product Price"
              defaultValue={productPrice}
              value={price}
              style={styles.inputText}
              onChangeText={(val) => setPrice(val)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="product Quantity"
              defaultValue={productQuantity}
              value={quantity}
              style={styles.inputText}
              onChangeText={(val) => setQuantity(val)}
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
          <TouchableOpacity style={styles.btn} onPress={() => del(docId)}>
            <Text style={styles.btnTxt}>Delete</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
export default EditItem;
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
  signinText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
    color: "#d81b60",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    color: "#d81b60",
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
  },
  formContainer: {
    width: "80%",
    marginLeft: 88,
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 10,
  },
  inputContainer: {
    width: "70%",
    marginBottom: 10,
  },
  inputText: {
    borderBottomWidth: 2,
    borderBottomColor: "#d81b60",
    paddingVertical: 10,
    color: "#212121",
    paddingLeft: 15,
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
    color: "#FFF",
  },
  bgContainer: {
    flex: 1,
    alignItems: "center",
  },
});

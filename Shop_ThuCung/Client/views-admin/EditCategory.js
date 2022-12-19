import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
//import Ionicons from "react-native-vector-icons/Ionicons";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { firebase } from "../config/firebase";
import {
  updateCate,
  deleteCate,
  fetchAllCategory,
} from "../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  uploadString,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const EditCategory = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const db = useSelector((store) => store.categories);

  const { CateId } = route.params;
  console.log("CateId", CateId);
  const { CateName } = route.params;
  const { CateImg } = route.params;

  const [docId, setId] = useState(CateId);
  console.log("docId", docId);
  const [name, setName] = useState(CateName);

  useEffect(() => {
    dispatch(fetchAllCategory());
    console.log("db", db);
  }, []);

  const handleUpdate = (docId) => {
    let update = {
      name: name,
      Img: selectedImage.localURI,
    };
    dispatch(updateCate(docId, update));
    dispatch(fetchAllCategory());
    navigation.navigate("ViewAll");
  };

  const handleDelete = (docId) => {
    dispatch(deleteCate(docId));
    dispatch(fetchAllCategory());
    navigation.navigate("ViewAll");
  };

  const [selectedImage, setSelectedImage] = useState({ localURI: CateImg });
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
    <View style={styles.loginContainer}>
      <ImageBackground
        source={require("../assets/BK.jpg")}
        resizeMode="cover"
        style={styles.bgContainer}
      >
        <View style={styles.logoLogin}>
          <Ionicons name="create" color="#FFF" size={36} />
        </View>
        <Text style={styles.signinText}>Edit Category</Text>
        <View style={styles.formContainer}>
          {/* <View style={styles.inputContainer}>
            <TextInput
              value={id}
              placeholder="Category ID"
              style={styles.inputText}
              onChangeText={(val) => setId(val)}
            />
          </View> */}
          {/* check val */}
          <Image source={{ uri: selectedImage.localURI }} style={styles.img} />
          <TouchableOpacity onPress={openImage}>
            <Text>Choose Image</Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Category Image"
              style={styles.inputText}
              value={selectedImage.localURI}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="CateName"
              defaultValue={CateName}
              value={name}
              style={styles.inputText}
              onChangeText={(val) => setName(val)}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleUpdate(docId)}
          >
            <Text style={styles.btnTxt}>Update</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.btn}
            //onPress={() => handleDelete(docId)}
          >
            <Text style={styles.btnTxt}>Delete</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </View>
  );
};
export default EditCategory;
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
    marginTop: 40,
  },
  signinText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 10,
    color: "#d81b60",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 0,
  },
  inputContainer: {
    width: "70%",
    //marginBottom: 10,
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
    marginTop: 50,
  },
  btnTxt: {
    color: "#FFF",
  },
  bgContainer: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});

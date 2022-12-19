import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { fetchAllPet, searchPet, deletePet } from "../redux/actions/petActions";
//step1
import { useDispatch, useSelector } from "react-redux";
//import ReadMore from "@fawazahmed/react-native-read-more";

const ViewAllPet = ({ navigation }) => {
  const dispatch = useDispatch();
  const db = useSelector((store) => store.pets);
  console.log(db);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllPet());
    setData(db.pets);
    console.log("all pet", data);
  }, []);
  const Search = (key) => {
    if (key.length > 0) {
      dispatch(searchPet(key));
    } else {
      dispatch(fetchAllPet());
    }
  };
  const del = (docId) => {
    dispatch(deletePet(docId));
    dispatch(fetchAllPet());
    navigation.navigate("ViewAllPet");
  };
  return (
    <View style={styles.CRUDContainer}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={{
          uri: "https://i.pinimg.com/236x/28/05/e5/2805e5e06abe120f8e2a667cdc00b8f1.jpg",
        }}
      >
        <View style={styles.leftHeader}>
          <TextInput
            placeholder="Search"
            style={styles.inputText}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            onPress={() => Search(search)}
            style={styles.btnSearch}
          >
            <Text style={styles.search}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>LIST PET</Text>
        </View>
        <ScrollView style={styles.ProductAllContainer}>
          {db.pets ? (
            db.pets.map((item, index) => {
              return (
                <View key={index} style={styles.tagContainer}>
                  <View style={styles.contentMain}>
                    <Image source={item.Image} style={styles.img} />
                    <View style={styles.View}>
                      <Text style={styles.textName}>Tên: {item.Name}</Text>
                      <Text style={styles.textPrice}>
                        Giá: {item.Price} VNĐ
                      </Text>
                      <View>
                        <TouchableOpacity
                          style={styles.btnUpdate}
                          onPress={() =>
                            navigation.navigate("EditPet", {
                              petId: item.id,
                              petName: item.Name,
                              petAge: item.Age,
                              petGender: item.Gender,
                              petCID: item.CateID,
                              petOrigin: item.Origin,
                              petPrice: item.Price,
                              petCondition: item.Condition,
                              petImage: item.Image,
                            })
                          }
                        >
                          <AntDesign name="edit" size={24} color="black" />
                          <Text style={styles.txtUpdate}>Edit</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                          style={styles.btnDel}
                          onPress={() => del(item.id)}
                        >
                          <AntDesign name="delete" size={24} color="black" />
                          <Text style={styles.txtDel}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <TouchableOpacity
                          style={styles.btnView}
                          onPress={() => {
                            navigation.navigate("DetailPet", {
                              petId: item.id,
                              petName: item.Name,
                              petAge: item.Age,
                              petGender: item.Gender,
                              petCID: item.CateID,
                              petOrigin: item.Origin,
                              petPrice: item.Price,
                              petCondition: item.Condition,
                              petImage: item.Image,
                            });
                          }} 
                        >
                          <Ionicons name="search" size={24} color="black" />
                          <Text style={styles.txtView}>View Detail</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View>
              <Text>No data</Text>
            </View>
          )}
        </ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("CreatePet");
            }}
          >
            <Ionicons
              style={styles.notiBtn}
              name="add"
              color="#fff"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default ViewAllPet;
const styles = StyleSheet.create({
  CRUDContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 4,
  },
  background: {
    flex: 1,
    padding: 20,
  },
  bgContainer: {
    height: "auto",
  },
  contentMain: {
    flexDirection: "row",
  },
  View: {
    marginLeft: 24,
    marginBottom: 28,
    justifyContent: "center",
  },
  ProductAllContainer: {
    width: "100%",
  },
  tagContainer: {
    width: 340,
    height: 180,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d81b60",
    paddingLeft: 10,
    margin: 10,
    backgroundColor: "#ede7f6",
  },
  tagCT: {
    width: "auto",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  textName: {
    color: "#d81b60",
    fontSize: 25,
    marginTop: 8,
    marginLeft: -4,
  },
  textPrice: {
    color: "#d81b60",
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#d81b60",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45 / 2,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginTop: 30,
    //alignSelf: "center",
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  tagss: {
    fontSize: 10,
    color: "#000",
  },
  tagAllContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  btnUpdate: {
    backgroundColor: "#ef9a9a",
    borderRadius: 5,
    flexDirection: "row",
    width: 100,
  },
  btnView: {
    backgroundColor: "#b39ddb",
    borderRadius: 5,
    flexDirection: "row",
    width: 128,
  },
  txtUpdate: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 6,
  },
  txtView: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 6,
  },
  ////////////////////////////////////////////////////////////////
  modal: {
    width: "90%",
    height: 400,
    backgroundColor: "#ede7f6",
    borderRadius: 10,
    marginLeft: 18,
    marginTop: 80,
    //alignItems: "center",
    //justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  imgInfo: {
    height: 180,
    width: 150,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 18,
  },
  imageContainer: {
    flexDirection: "row",
  },
  text: {
    width: "55%",
    padding: 5,
    marginTop: 25,
  },
  txtPrice: {
    fontSize: 20,
    color: "red",
  },
  txtName: {
    color: "#d81b60",
    fontSize: 25,
  },
  textDes: {
    marginLeft: 6,
  },
  text3: {
    fontSize: 15,
    marginLeft: 10,
    flexWrap: "wrap",
  },
  textTitle: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    marginLeft: 6,
  },
  text4: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnClosingModal: {
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "#f06292",
    width: 100,
    alignItems: "center",
    borderRadius: 20,
  },
  btnText: {
    fontSize: 30,
    color: "#f3e5f5",
  },
  description: {
    flexDirection: "row",
  },
  leftHeader: {
    width: "88%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginTop: 10,
  },
  inputText: {
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    borderRadius: 50 / 2,
    borderColor: "#000",
    borderWidth: 2,
    width: "80%",
    height: 50,
    paddingLeft: "6%",
    fontSize: 20,
    fontWeight: "500",
    backgroundColor: "white",
  },
  search: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  btnSearch: {
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderWidth: 2,
  },
  btnDel: {
    backgroundColor: "#ec407a",
    borderRadius: 5,
    flexDirection: "row",
    width: 100,
  },
  txtDel: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 6,
  },
});

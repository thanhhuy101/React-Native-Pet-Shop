import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  // Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategory,
  SearchCate,
  deleteCate,
} from "../redux/actions/categoryActions";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const ViewAllCategory = ({ navigation, route }) => {
  const db = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  // const { productId } = route.params;
  // const [docId, setdocId] = useState(productId);
  console.log(db);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearchCate = (key) => {
    if (key.length > 0) {
      dispatch(SearchCate(key));
    } else {
      dispatch(fetchAllCategory());
    }
  };
  useEffect(() => {
    dispatch(fetchAllCategory());
    setData(db.categories);
    console.log(data);
  }, []);

  const del = (docId) => {
    dispatch(deleteCate(docId));
    dispatch(fetchAllCategory());
    navigation.navigate("ViewAll");
  };

  // const HeaderComponent = () => {
  //   return (
  //     <View style={styles.headerListComponent}>
  //       <Text style={styles.headerComponentTitle}>LIST CATEGORY</Text>
  //     </View>
  //   );
  // };
  const ItemComponent = ({ item }) => {
    return (
      <View key={item.docId} style={styles.tagContainer}>
        <View style={styles.contentMain}>
          <Image source={{ uri: item.Img }} style={styles.img} />
          <View style={styles.View}>
            <View>
              <Text style={styles.tagText}>{item.name}</Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnUpdate}
                onPress={() =>
                  navigation.navigate("Edit", {
                    CateId: item.id,
                    CateImg: item.Img,
                    CateName: item.name,
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
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.ListItemContainer}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={{
          uri: "https://wallpaperwoo.com/uploads/pictures/wallpapers/original/87053_6b954a8c0fe03e9cc30f94964febce9a.jpg",
        }}
      >
        <View style={styles.leftHeader}>
          <TextInput
            placeholder="Search"
            style={styles.inputText}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            onPress={() => handleSearchCate(search)}
            style={styles.btnSearch}
          >
            <Text style={styles.search}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerComponentTitle}>LIST CATEGORY</Text>

        <FlatList
          data={db.categories}
          //ListHeaderComponent={HeaderComponent}
          renderItem={ItemComponent}
        ></FlatList>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => navigation.navigate("Create")}
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

export default ViewAllCategory;
//const width = Dimensions.get("window").width - 20;
const styles = StyleSheet.create({
  txtAdd: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 40,
  },
  ListItemContainer: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  background: {
    flex: 1,
    padding: 20,
  },
  btnAdd: {
    backgroundColor: "#d81b60",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45 / 2,
  },
  ItemComponent: {
    marginTop: 50,
    //width: width / 2,
    padding: 5,

    borderColor: "#000",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: "center",
  },
  ItemDetail: {
    textAlign: "center",
    width: "70%",
  },
  nameTxt: {
    color: "white",
    marginTop: 5,
    fontSize: 18,
    flexWrap: "wrap",
  },
  priceTxt: {
    color: "#64b5f6",
    fontSize: 18,
  },
  detailTxt: {
    color: "black",
    fontSize: 15,
  },
  rating: {
    color: "#f4511e",
  },
  headerComponentTitle: {
    color: "#d81b60",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
  },
  headerListComponent: {
    textAlign: "center",
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
  tagContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "86%",
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d81b60",
    paddingLeft: 10,
    margin: 10,
    marginLeft: 26,
    backgroundColor: "#ede7f6",
  },
  contentMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  View: {
    marginLeft: 24,
    marginBottom: 28,
    justifyContent: "center",
  },
  tagText: {
    color: "#d81b60",
    fontSize: 30,
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
  },
  btnDel: {
    backgroundColor: "#ec407a",
    borderRadius: 5,
    flexDirection: "row",
    width: 100,
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
  txtDel: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 6,
  },
  //////////
  modal: {
    width: "90%",
    height: 260,
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
  btnClosingModal: {
    marginTop: 14,
    alignSelf: "center",
    backgroundColor: "#f06292",
    width: 100,
    alignItems: "center",
    borderRadius: 20,
    height: 30,
    justifyContent: "center",
  },
  btnText: {
    fontSize: 22,
  },
  Pet: {
    justifyContent: "center",
    alignItems: "center",
  },
  Item: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnCate: {
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "#c5cae9",
    width: 116,
    height: 30,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  txtCate: {
    fontSize: 18,
  },
  btnPet: {
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "#c5cae9",
    width: 100,
    height: 30,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  txtPet: {
    fontSize: 18,
  },
  btnItem: {
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "#c5cae9",
    width: 100,
    height: 30,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  txtItem: {
    fontSize: 18,
  },
  titleModal: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
} from "react-native";
import { fetchAllItem, findItem } from "../redux/actions/itemActions";
import { Ionicons, AntDesign } from "@expo/vector-icons";
//step1
import { useDispatch, useSelector } from "react-redux";

const ViewAllItem = ({ navigation, route }) => {
  const db = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchItem = (key) => {
    if (key.length > 0) {
      dispatch(findItem(key));
    } else {
      dispatch(fetchAllItem());
    }
  };
  useEffect(() => {
    dispatch(fetchAllItem());
    setData(db.item);
    console.log(data);
  }, []);

  const HeaderComponent = () => {
    return (
      <View style={styles.headerListComponent}>
        <Text style={styles.HeaderTitle}>LIST ITEM</Text>
      </View>
    );
  };
  const ItemComponent = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.docId}
        style={styles.ItemComponent}
        onPress={() => {
          navigation.navigate("EditItem", {
            productCId: item.cateID,
            productId: item.id,
            productName: item.name,
            productPrice: item.price,
            productQuantity: item.quantity,
            productImage: item.image,
          });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.img} />

        <View style={styles.itemDetail}>
          <Text style={styles.name}>Tên: {item.name}</Text>
          <Text style={styles.price}>Giá: {item.price} VNĐ</Text>
          <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={{
          uri: "https://wallpaperwoo.com/uploads/pictures/wallpapers/original/87053_6b954a8c0fe03e9cc30f94964febce9a.jpg",
        }}
      >
        <View style={styles.searchView}>
          <TextInput
            placeholder="Search"
            style={styles.inputText}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            style={styles.btnSearch}
            onPress={() => searchItem(search)}
          >
            <Text style={styles.searchTxt}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={db.items}
          ListHeaderComponent={HeaderComponent}
          renderItem={ItemComponent}
        ></FlatList>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => navigation.navigate("CreateItem")}
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
export default ViewAllItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  background: {
    flex: 1,
    padding: 20,
  },
  searchView: {
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
  btnSearch: {
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderWidth: 2,
  },
  searchTxt: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  HeaderTitle: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
    paddingTop: 10,
    textAlign: "center",
  },
  btnAdd: {
    backgroundColor: "#d81b60",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45 / 2,
  },
  btnView: {
    justifyContent: "center",
    alignItems: "center",
  },
  ItemComponent: {
    width: 320,
    height: 160,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d81b60",
    paddingLeft: 10,
    margin: 10,
    backgroundColor: "#ede7f6",
    flexDirection: "row",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: "center",
  },
  itemDetail: {
    marginLeft: 24,
    marginBottom: 28,
    justifyContent: "center",
  },
  name: {
    color: "#d81b60",
    fontSize: 25,
    marginTop: 8,
    marginLeft: -4,
  },
  price: {
    color: "#d81b60",
    fontSize: 20,
  },
  quantity: {
    color: "#d81b60",
    fontSize: 20,
  },
});

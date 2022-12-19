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
import { fetchAllPet, searchPet } from "../redux/actions/petActions";
//import { fetchAllItem, findItem } from "../redux/actions/itemActions";
import { Ionicons, AntDesign } from "@expo/vector-icons";
//step1
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../redux/actions/cartAction";

const ViewAllItem = ({ navigation, route }) => {
  const db = useSelector((store) => store.pets);
  const db1 = useSelector((store) => store.cartReducer);
  // const db_i = useSelector((store) => store.items);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(fetchAllPet());
    // dispatch(fetchAllItem());
    setData(db.pets);
    setCart(db1.carts);
    //setData(db_i.items);
    console.log("all pet", data);
  }, []);
  const Search = (key) => {
    if (key.length > 0) {
      dispatch(searchPet(key));
    } else {
      dispatch(fetchAllPet());
    }
  };

  const { cateId } = route.params;
  const { cateName } = route.params;
  const { cateImg } = route.params;
  const [id, setId] = useState(cateId);

  const HeaderComponent = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerListComponent}>
          <Text style={styles.HeaderTitle}>LIST PET</Text>
        </View>
      </View>
    );
  };
  const ItemComponent = ({ item }) => {
    return item.CateID == id ? (
      <View key={item.docId} style={styles.ItemComponent}>
        <Image source={{ uri: item.Image }} style={styles.img} />

        <View style={styles.itemDetail}>
          <Text style={styles.name}>Tên: {item.Name}</Text>
          <Text style={styles.price}>Giá: {item.Price} VNĐ</Text>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnDetail}
              onPress={() => {
                navigation.navigate("ProductDetail", {
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
              <Text style={styles.btnDetailTxt}>View Detail</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.btnDetail}    onPress={() => {
                dispatch(CartActions(item));
                alert("add success");
                navigation.navigate("Cart", {
                  carts: db1.carts,
                });
              }}>
              <AntDesign name="shoppingcart" size={34} color="black" />
              <Text style={styles.btnDetailTxt}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ) : (
      <View>
        <Text>No data</Text>
      </View>
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
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={30} color="black" />
            <Text style={styles.btnTxt}>Back</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.inputText}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity
            style={styles.btnSearch}
            onPress={() => Search(search)}
          >
            <Text style={styles.searchTxt}>Tìm kiếm</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={db.pets}
          ListHeaderComponent={HeaderComponent}
          renderItem={ItemComponent}
        ></FlatList>
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
    width: "90%",
    height: 50,
    paddingLeft: "6%",
    fontSize: 20,
    fontWeight: "500",
    backgroundColor: "white",
    marginLeft: 10,
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
  btn: {
    flexDirection: "row",
    alignSelf: "center",
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  headerListComponent: {
    alignItems: "center",
  },
  btnDetail: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnDetailTxt: {
    fontSize: 20,
  },
  footer: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#98ee99",
    marginTop: 10,
    justifyContent: "space-around",
    width: 156,
  },
});

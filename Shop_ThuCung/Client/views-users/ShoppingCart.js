import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList,
  StyleSheet,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { CartActions, deleteCart } from "../redux/actions/cartAction";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const ShoppingCart = ({ navigation, route }) => {
  const db1 = useSelector((store) => store.cartReducer);
  const db2 = useSelector((store) => store.cartReducer);
  console.log("shopping", route.params.carts);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const cart = () => {
    return db1.carts.map((item, index) => {
      return (
        <View key={index} style={styles.itemBody}>
          <View style={styles.itemViewImage}>
            <Image source={item.Image} style={styles.itemImage} />
          </View>
          <View style={styles.itemContent}>
            <View>
              <Text style={styles.itemName}>{item.Name}</Text>
              <View style={styles.itemViewPrice}>
                <Text style={styles.itemPrice}>{item.Price} &#8363; </Text>
              </View>
            </View>
            <View style={styles.itemContentTool}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteCart(item.docId, item));
                  Alert.alert("Xóa thành công");
                }}
                style={styles.itemViewDelete}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  style={styles.itemBtnDelete}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };
  const cartItem = () => {
    return db2.carts.map((item, index) => {
      return (
        <View key={index} style={styles.itemBody}>
          <View style={styles.itemViewImage}>
            <Image source={item.image} style={styles.itemImage} />
          </View>
          <View style={styles.itemContent}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemViewPrice}>
                <Text style={styles.itemPrice}>{item.price} &#8363; </Text>
              </View>
            </View>
            <View style={styles.itemContentTool}>
              <View style={styles.itemQuantity}>
                <View style={styles.itemViewPlusMinus}>
                  <TouchableOpacity
                    onPress={() => minusQuantity(item.id, item.quantity)}
                  >
                    <MaterialCommunityIcons
                      name="minus"
                      style={styles.itemPlusMinus}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemNumQuantity}>1</Text>
                <View style={styles.itemViewPlusMinus}>
                  <TouchableOpacity
                    onPress={() => plusQuantity(item.id, item.quantity)}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      style={styles.itemPlusMinus}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteCart(item.docId, item));
                  Alert.alert("Xóa thành công");
                }}
                style={styles.itemViewDelete}
              >
                <MaterialCommunityIcons
                  name="delete-outline"
                  style={styles.itemBtnDelete}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={36} color="black" />
          <Text style={styles.btnTxt}>Back</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Shopping Cart</Text>
      <ScrollView>
        <View>{cart()}</View>
        <View>{cartItem()}</View>
      </ScrollView>

      <View style={{ paddingTop: 10, paddingHorizontal: 10 }}>
        <View>
          <View style={styles.ViewTotalFee}>
            <View style={styles.infoViewTotal}>
              <Text style={styles.infoTextTotal}>Tổng cộng</Text>
              <Text style={styles.infoMoneyTotal}>hihihi &#8363;</Text>
            </View>
          </View>
          <View style={styles.ViewPayment}>
            <View style={styles.infoViewPayment}>
              <Text style={styles.infoTextPayment}>Thành tiền</Text>
              <Text style={styles.infoMoneyTotal}>hihihi &#8363;</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.paymentViewBtn}>
        <TouchableOpacity style={styles.paymentBtn}>
          <Text style={styles.paymentBtnText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f5f5f5",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e1bee7",
  },
  headerBtnBack: {
    fontSize: 18,
    color: "#c2c2c2",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 26,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  bodyTitle: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "500",
    letterSpacing: 1,
    paddingTop: 20,
    paddingLeft: 16,
    marginBottom: 10,
  },
  paymentViewBtn: {
    position: "relative",
    bottom: 0,
    borderTopColor: "#c2c2c2",
    borderTopWidth: 1,
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    padding: 9,
  },
  paymentBtn: {
    width: "86%",
    height: "90%",
    backgroundColor: "#0043F9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentBtnText: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
    color: "#ffffff",
    textTransform: "uppercase",
  },
  ViewTotalFee: {
    padding: 16,
    marginTop: 40,
    // marginBottom: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  infoViewTotal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoTextTotal: {
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "80%",
    color: "#000000",
    opacity: 0.8,
  },
  infoMoneyTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    opacity: 0.8,
  },
  infoViewShipFee: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoTextShipFee: {
    fontSize: 16,
    fontWeight: "600",
    maxWidth: "80%",
    color: "#000000",
    opacity: 0.8,
  },
  infoMoneyShipFee: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    opacity: 0.8,
  },
  ViewPayment: {
    padding: 16,
    marginTop: 15,
    marginBottom: 40,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  infoViewPayment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoTextPayment: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: "80%",
    color: "#000000",
  },
  infoMoneyPayment: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  itemBody: {
    width: "100%",
    height: 120,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderWidth: 2,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  itemViewImage: {
    width: "30%",
    height: "100%",
    padding: 9,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 10,
    marginRight: 7,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  itemContent: {
    width: "67%",
    height: "100%",
    justifyContent: "space-around",
  },
  itemName: {
    fontSize: 14,
    maxWidth: "100%",
    color: "#000000",
    fontWeight: "700",
    letterSpacing: 1,
    overflow: "hidden",
  },
  itemViewPrice: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.6,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: "85%",
    marginRight: 4,
    color: "red",
  },
  itemContentTool: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemViewPlusMinus: {
    borderRadius: 100,
    marginRight: 20,
    padding: 3,
    borderWidth: 1.6,
    borderColor: "#000000",
    opacity: 0.7,
  },
  itemPlusMinus: {
    fontSize: 16,
    color: "#000000",
    opacity: 1,
  },
  itemNumQuantity: {
    marginRight: 20,
    fontSize: 17,
  },
  itemViewDelete: {
    borderRadius: 100,
    padding: 4,
    borderWidth: 2,
    borderColor: "red",
    opacity: 0.5,
    marginRight: 5,
  },
  itemBtnDelete: {
    fontSize: 20,
    color: "#c2c2c2",
    backgroundColor: "#f5f5f5",
    color: "red",
  },
  btn: {
    flexDirection: "row",
  },
  btnTxt: {
    marginTop: 2,
    fontSize: 26,
    color: "#000000",
    fontWeight: "bold",
  },
});

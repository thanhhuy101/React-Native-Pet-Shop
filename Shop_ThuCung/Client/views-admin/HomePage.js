import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

const HomePage = ({ navigation }) => (
  <View style={styles.container}>
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={{
        uri: "https://i.pinimg.com/originals/23/e7/6b/23e76b9437ea6d9ed105dce1bc4d061c.jpg",
      }}
    >
      <View style={styles.header}>
        <View style={styles.img}>
          <Image
            style={styles.ava}
            resizeMode="stretch"
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzkS4LLpODGKz8Vfl4eEiClD1M4NWk_VSMfK2zLJrdwxl1eV22IRbm44WYq6gU2xN9X_Y&usqp=CAU",
            }}
          />
        </View>
        <View style={styles.admin}>
          <Text style={styles.name}>Admin</Text>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate("Login")}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={styles.logoutTxt}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>SHOP MANAGEMENT</Text>
      </View>
      <View style={styles.listItem}>
        <TouchableOpacity style={styles.btnItem} onPress={() => navigation.navigate("ViewAll")}>
          <MaterialIcons name="category" size={24} color="black" />
          <Text style={styles.itemTxt}>Category Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnItem} onPress={() => navigation.navigate("ViewAllPet")}>
          <MaterialIcons name="pets" size={24} color="black" />
          <Text style={styles.itemTxt}>Pet Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnItem} onPress={() => navigation.navigate("ViewAllItem")}>
          <AntDesign name="gift" size={24} color="black" />
          <Text style={styles.itemTxt}>Item Management</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);

export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    //justifyContent: "space-around",
  },
  admin: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 140,
  },
  btnLogout: {
    flexDirection: "row",
  },
  logoutTxt: {
    marginLeft: 10,
    fontSize: 18,
  },
  ava: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  img: {
    marginLeft: 10,
    marginTop: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  listItem: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnItem: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#f8bbd0",
    width:280,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10
  },
  itemTxt: {
    fontSize: 20,
    marginLeft: 5,
  },
});

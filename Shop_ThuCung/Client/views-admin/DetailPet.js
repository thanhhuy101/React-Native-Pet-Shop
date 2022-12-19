import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import {
  MaterialIcons,
  FontAwesome,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
const DetailPet = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(true);
  const { petId } = route.params;
  const { petName } = route.params;
  const { petAge } = route.params;
  const { petGender } = route.params;
  const { petCID } = route.params;
  const { petOrigin } = route.params;
  const { petPrice } = route.params;
  const { petCondition } = route.params;
  const { petImage } = route.params;

  const popUp = () => {
    setShowModal(false);
    navigation.goBack();
  };
  return (
    <Modal
      transparent={true}
      visible={showModal}
      animationType={"slide"}
      onRequestClose={() => setShowModal(false)}
    >
      <Pressable
        onPress={(evt) =>
          evt.target == evt.currentTarget ? popUp() : setShowModal(true)
        }
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%", 
            }}
          >
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                key={petId}
                source={{ uri: petImage }}
              />
              <Text style={styles.header}>Thông tin chi tiết</Text>
              <View style={styles.detail}>
                <View style={styles.info1}>
                  <MaterialIcons name="pets" size={34} color="black" />
                  <Text style={styles.txt1}>Tên:</Text>
                  <Text style={styles.txtF}>{petName}</Text>
                </View>
                <View style={styles.info2}>
                  <FontAwesome name="dollar" size={32} color="black" />
                  <Text style={styles.txt2}>Giá:</Text>
                  <Text style={styles.txtF}>{petPrice} Vnd</Text>
                </View>
                <View style={styles.info3}>
                  <FontAwesome name="calendar-o" size={30} color="black" />
                  <Text style={styles.txt3}>Tuổi:</Text>
                  <Text style={styles.txtF}>{petAge}</Text>
                </View>
                <View style={styles.info4}>
                  <FontAwesome name="intersex" size={32} color="black" />
                  <Text style={styles.txt4}>Giới tính:</Text>
                  <Text style={styles.txtF}>{petGender}</Text>
                </View>
                <View style={styles.info5}>
                  <EvilIcons name="location" size={34} color="black" />
                  <Text style={styles.txt5}>Xuất sứ:</Text>
                  <Text style={styles.txtF}>{petOrigin}</Text>
                </View>
                <View style={styles.info6}>
                  <AntDesign name="Safety" size={34} color="black" />
                  <Text style={styles.txt6}>Trạng thái:</Text>
                  <Text style={styles.txtF}>{petCondition}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
export default DetailPet;
const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 40,
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(1,1,1,0.75)",
    paddingTop: "20%",
  },
  modalContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#ede7f6",
    borderRadius: 15,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  imgContainer: {
    width: "100%",
    height: 250,
  },
  titleContent: {
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  detail: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    justifyContent: "space-around",
  },
  info1: {
    flexDirection: "row",
  },
  info2: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 4,
  },
  info3: {
    flexDirection: "row",
    marginLeft: 2,
    marginTop: 5,
  },
  info4: {
    flexDirection: "row",
    marginLeft: 4,
    marginTop: 4,
  },
  info5: {
    flexDirection: "row",
    marginTop: 8,
    marginLeft: -2,
  },
  info6: {
    flexDirection: "row",
    marginTop: 4,
  },
  txt1: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
  },
  txt2: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 18,
  },
  txt3: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  txt4: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  txt5: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  txt6: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  txtF: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
  },
  txtF: {
    padding: 5,
    fontSize: 16,
    fontWeight: "700",
  },
});

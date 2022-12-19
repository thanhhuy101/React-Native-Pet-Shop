// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   TextInput,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// //import { FontAwesome, Ionicons, FontAwesome5 } from "@expo/vector-icons";
// import Icon from "react-native-vector-icons/FontAwesome";

// const Login = ({ navigation }) => {
//   return (
//     <View style={styles.loginContainer}>
//       <ImageBackground
//         style={styles.bgContainer}
//         source={require("../assets/bgpet.jpg")}
//         resizeMode="stretch"
//       >
//         <View style={styles.formContainer}>
//           <Text style={styles.title}>PET SHOP</Text>
//           <View style={{ flexDirection: "row" }}>
//             <View style={{ marginRight: 5, marginTop: 3 }}>
//               <Icon name="user" size={38} color="#c2185b" />
//             </View>
//             <View style={styles.inputContainer}>
//               <TextInput placeholder="Username" style={styles.inputText} />
//             </View>
//           </View>
//           <View style={{ flexDirection: "row" }}>
//             <View style={{ marginRight: 5, marginTop: 3 }}>
//               <Icon name="lock" size={40} color="#c2185b" />
//             </View>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 placeholder="Password"
//                 style={styles.inputText}
//                 secureTextEntry={true}
//               />
//             </View>
//           </View>
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               alert("Đăng nhập thành công !!");
//               navigation.navigate("Tab");
//               //navigation.navigate("Product");
//             }}
//           >
//             <Text style={styles.btnText}>Login</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.btn}  onPress={() => {
//               alert("Đăng nhập thành công !!");
//               navigation.navigate("Register");
//             }}>
//             <Text style={styles.btnText}>Register</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// export default Login;
// const styles = StyleSheet.create({
//   loginContainer: {
//     flex: 1,
//   },
//   bgContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     borderRadius: 20,
//   },
//   title: {
//     color: "#37474f",
//     fontSize: 40,
//     fontWeight: "bold",
//     fontStyle: "italic",
//   },
//   formContainer: {
//     flex:2,
//     width: "100%",
//     alignItems: "center",
//     marginTop: 260,
//   },
//   inputContainer: {
//     width: "60%",
//   },
//   inputText: {
//     borderBottomWidth: 2,
//     borderBottomColor: "#b71c1c",
//     paddingVertical: 5,
//     marginBottom: 10,
//   },
//   btn: {
//     backgroundColor: "#b71c1c",
//     width: "70%",
//     height: 45,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 45 / 2,
//     marginTop: 15,
//   },
//   btnText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 22,
//   },
// });

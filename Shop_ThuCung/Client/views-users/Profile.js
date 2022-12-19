// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Dimensions,
//   ScrollView,
//   Image,
//   TouchableOpacity
// } from "react-native";
// import { auth } from "../App";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import COLORS from '../src/const/colors';

// const handleSignOut = () => {
  
//   auth
//     .signOut()
//     .then(() => {
//       navigation.replace("Login");
//     })
//     .catch(error => alert("User signed out!"));
// };
// const Profile = ({ navigation }) => {
  
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.wrap}>
//         <ScrollView
          
//         />
//         <View style={styles.wrapDot} />
//       </View>
//         <View style={styles.header}>
//             <Icon
//               name="arrow-left"
//               size={28}
//               color={COLORS.dark}
//               onPress={navigation.goBack}
//             />
//             <Icon/>
//           </View>
//       <Text style={styles.textSetting}>Setting detail</Text>
//       <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
//                   <Text> {auth.currentUser?.email}</Text>
//                   </Text>
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <TouchableOpacity style={styles.btnLogout} onPress={handleSignOut}>
//           <Text style={styles.textLogout}>Log out</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Profile;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#bdbdbd"
//   },

//   wrapDot: {
//     position: "absolute",
//     bottom: 0,
//     flexDirection: "row",
//     alignSelf: "center"
//   },
//   dotActive: {
//     margin: 3,
//     color: "black"
//   },
//   dot: {
//     margin: 3,
//     color: "white"
//   },
//   textSetting: {
//     fontSize: 30,
//     textAlign: "center"
//   },
//   btnLogout: {
//     backgroundColor: "#ef5350",
//     borderRadius: 5,
//     width: 100,
//     height: 30,
//     marginLeft: 10,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   textLogout: {
//     fontSize: 20,
//     color: "#f5f5f5"
//   }
// });

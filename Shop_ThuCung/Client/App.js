import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Product from "./views-users/Product";
import Login from "./FirebaseAuth/Login";
import Register from "./FirebaseAuth/Register";
// import Login from "./views-users/Login";
// import Register from "./views-users/Register";
import Home from "./views-users/Home";
import Search from "./views-users/Search";
import Profile from "./views-users/Profile";

import Cart from "./views-users/ShoppingCart";

// import Settings from "./views/Settings";FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./redux/stores/store";

import ActionManagement from "./views-admin/ActionManagement";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { container } from "./components/Styles/styles";
import React, { Component } from "react";
import DetailsScreen from './views-users/DetailsScreen';
import ShoppingCart from "./views-users/ShoppingCart";
import ViewAll from "./views-users/ViewAll";
//////////
import ProfileScreen from "./src/views/profile/ProfileScreen";
import { QueryClient, QueryClientProvider } from 'react-query';
import EditProfile from "./src/views/profile/EditProfile";

import ProductDetail from "./views-users/ProductDetail";
////***********STACK + TAB */
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } }
})
function TabNavigator() {
  return (
    <Tab.Navigator
   screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Pet") {
            iconName = focused ? "paw" : "paw";
          } else if (route.name === "Item") {
            iconName = focused ? "cube" : "cube";
          } else if (route.name === "Cart") {
            iconName = focused ? "ios-cart" : "ios-cart";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#ffcdd2",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#9575cd" }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        screenOptions={{ headerShown: false }}
      />
      <Tab.Screen
        name="Pet"
        component={Product}
        screenOptions={{ headerShown: false }}
      />
      <Tab.Screen
        name="Item"
        component={Search}
        screenOptions={{ headerShown: false }}
      />

      <Tab.Screen
        name="Cart"
        component={ShoppingCart}
        screenOptions={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
const firebaseConfig = {
  apiKey: "AIzaSyAYMuvKxNIxRmJGMTNOaFzvjEgizvn7vMk",
  authDomain: "petshop-15312.firebaseapp.com",
  projectId: "petshop-15312",
  storageBucket: "petshop-15312.appspot.com",
  messagingSenderId: "717131902382",
  appId: "1:717131902382:web:d41b26a8176a89064f6c3f"
};


let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };
const Drawer = createDrawerNavigator();
function DrawerNavigator({ }) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="ProfileUser" component={ProfileScreen} initialParams={{ initialUserId: firebase.auth().currentUser.uid }} />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        });
      }
    });
  }
  render() {
    const { loggedIn } = this.state;
    if (!loggedIn) {
      return (
        // <NavigationContainer>
        //   <Stack.Navigator initialRouteName="Login">
        //     <Stack.Screen
        //       name="Login"
        //       navigation={this.props.navigation}
        //       component={Login}
        //       options={{ headerShown: false }}
        //     />
        //     <Stack.Screen
        //       name="Register"
        //       navigation={this.props.navigation}
        //       component={Register}
        //       options={{ headerShown: false }}
        //     />
        //   </Stack.Navigator>
        // </NavigationContainer>
         <Provider store={store}>
          <ActionManagement />
        </Provider> 
      );
    }
    // return (
    //   <Provider store={store}>
    //     <QueryClientProvider client={queryClient}>
    //       <NavigationContainer>
    //         <Stack.Navigator initialRouteName="Main">
    //         <Stack.Screen name="Tab" component={DrawerNavigator} />
    //         <Stack.Screen name="Product" component={Product} />
    //         <Stack.Screen name="Cart" component={ShoppingCart} />
    //         {/* <Stack.Screen name="DetailsScreen" component={DetailsScreen} /> */}
    //         <Stack.Screen name="ViewAll" component={ViewAll} />
    //         <Stack.Screen name="ProductDetail" component={ProductDetail} />
    //         <Stack.Screen name="editProfile" component={EditProfile} />
    //         </Stack.Navigator>
    //       </NavigationContainer>
    //     </QueryClientProvider>
    //   </Provider>
      
    // );
    
    
  }
}
export default App;

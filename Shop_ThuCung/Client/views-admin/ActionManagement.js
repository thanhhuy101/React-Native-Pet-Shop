import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ViewAllCategory from "./ViewAllCategory";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import CreatePet from "./CreatePet";
import EditPet from "./EditPet";
import ViewAllPet from "./ViewAllPet";
import ViewAllItem from "./ViewAllItem";
import CreateItem from "./CreateItem";
import EditItem from "./EditItem";
import HomePage from "./HomePage";
import DetailPet from "./DetailPet";

const Stack = createNativeStackNavigator();
const ActionManagement = ({}) => {
  return (
    <NavigationContainer screenOptions={{ headerShown: false }}>
      <Stack.Navigator >
        <Stack.Screen name="Homepage"component={HomePage} />
        <Stack.Screen name="ViewAll" component={ViewAllCategory} />
        <Stack.Screen name="Create" component={CreateCategory} />
        <Stack.Screen name="Edit" component={EditCategory} />
        <Stack.Screen name="ViewAllPet" component={ViewAllPet} />
        <Stack.Screen name="CreatePet" component={CreatePet} />
        <Stack.Screen name="EditPet" component={EditPet} />
        <Stack.Screen name="ViewAllItem" component={ViewAllItem} />
        <Stack.Screen name="CreateItem" component={CreateItem} />
        <Stack.Screen name="EditItem" component={EditItem} />
        <Stack.Screen name="DetailPet" component={DetailPet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ActionManagement;
const styles = StyleSheet.create({});

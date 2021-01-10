import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from "@expo/vector-icons";

import SignInScreen from "./src/screens/SignInScreen";
import AccountScreen from "./src/screens/AccountScreen";
import IndexScreen from "./src/screens/IndexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";
import { Provider } from "./src/context/BlogContext";
import { navigationRef } from './navigation/RootNavigation';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <Provider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          mode="modal"
          initialRouteName="Index"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
              height: 80,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "bold",
            },
            title: "Blogs",
          }}
        >
          <Stack.Screen component={AccountScreen} name="Account" />
          <Stack.Screen component={SignInScreen} name="SignIn" />
          <Stack.Screen
            component={IndexScreen}
            name="Index"
            options={{
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigationRef.current.navigate("Create")}>
                  <EvilIcons name="plus" size={35} color="white"/>
                </TouchableOpacity>
              )
            }}
          />
          <Stack.Screen component={ShowScreen} name="Show" />
          <Stack.Screen component={CreateScreen} name="Create" />
          <Stack.Screen component={EditScreen} name="Edit" />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

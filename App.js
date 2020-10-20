import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import Colors from "./theme/Colors";

import { Feather, FontAwesome5  } from '@expo/vector-icons';
import HomeScreen from "./screens/Home";
import Genres from "./screens/Genres";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				tabBarOptions={{
					activeTintColor: "#fff",
					inactiveTintColor: "#878787",
					showLabel: false,
					style: {
						backgroundColor: Colors.black,
					}
				}}
			>
				<Tab.Screen name="Home" component={HomeScreen} options={{
					tabBarIcon: ({color, size}) => (
						<Feather name="home" size={size - 5} color={color} />
					)
				}} />
				<Tab.Screen name="Genres" component={Genres} options={{
					tabBarIcon: ({color, size}) => (
						<FontAwesome5 name="bars" size={size - 5} color={color} />
					)
				}} />
			</Tab.Navigator>
		<StatusBar style="light" />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
		alignItems: "center",
		justifyContent: "center",
	},
});

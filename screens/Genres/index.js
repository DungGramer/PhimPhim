import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GenresList from './GenresList';
import ListAll from '../../components/ListAll';
import DetailMovie from '../DetailMovie';
import VideoPlayer from '../VideoPlayer';

const Stack = createStackNavigator();

export default function Genres() {
	return (
		// Nếu mà tất cả các screen đều có options giống nhau thì nên cung cấp screenOptions
		// vào trong navigator
		// <Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Navigator>
			<Stack.Screen name="GenresList" component={GenresList} options={{headerShown: false}} />
			<Stack.Screen name="ListAll" component={ListAll} options={{headerShown: false}} />
			<Stack.Screen name="DetailMovie" component={DetailMovie} options={{headerShown: false}} />
			<Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}

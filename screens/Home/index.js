import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Home from './Home';
import Search from './Search';
import ListMovie from '../../components/ListMovie';
import ListAll from '../../components/ListAll';
import DetailMovie from '../DetailMovie';
import VideoPlayer from '../VideoPlayer';


export default function HomeScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
			<Stack.Screen name="Search" component={Search} options={{headerShown: false}} />
			<Stack.Screen name="ListAll" component={ListAll} options={{headerShown: false}} />
			<Stack.Screen name="ListMovie" component={ListMovie} options={{headerShown: false}} />
			<Stack.Screen name="DetailMovie" component={DetailMovie} options={{headerShown: false}} />
			<Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{headerShown: false}} />
		</Stack.Navigator>
	);
}
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from "../theme/Colors";

export default function GenresItem ({onPress, name}) {
	return(
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Text style={styles.name}>{name}</Text>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		padding: 15,
	},
	name: {
		color: Colors.white,
		fontSize: 15,
	}
})
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../theme/Colors';
function Hashtag({name, onPress}) {
	return(
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text style={styles.title}>{name}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.blackBackground,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
	},
	title: {
		color: "#fff",
		fontWeight: "bold",
	},
})

export default Hashtag;
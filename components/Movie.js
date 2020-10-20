import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Colors from '../theme/Colors';

const {width}  = Dimensions.get('window');

function Movie({ title, poster_path, onPress }) {
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Image
				style={styles.image}
				source={{
					uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`,
				}}
			/>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 10,
	},
	image: {
		width: (width - 60) / 2,
		height: width - 150, 
		resizeMode: "cover",
		borderRadius: 5,
		overflow: "hidden",
	},
	title: {
		paddingTop: 5,
		width: 170,
		textAlign: "center",
		fontSize: 15,
		color: Colors.white
	}
});

export default Movie;

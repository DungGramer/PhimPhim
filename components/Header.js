import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Header() {
	const navigation = useNavigation(); 
	return(
		<View style={styles.headerContainer}>
			<Text style={styles.logo}>PhimPhim</Text>
			<TouchableOpacity onPress={() => navigation.push("Search")}>
				<Ionicons name="md-search" size={24} color="#fff" />
			</TouchableOpacity>
	</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		justifyContent: "space-between",
		marginVertical: 8,
		marginHorizontal: 5,
		alignItems: "center"
	},
	logo: {
		color: "#fff",
		fontFamily: "Oswald_600SemiBold",
		fontSize: 18,
	},
})

export default Header;
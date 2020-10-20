import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { AppLoading } from 'expo';
import {
	useFonts,
	Inter_400Regular,
	Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
	Oswald_600SemiBold,
} from "@expo-google-fonts/oswald";
import ListMovie from "../../components/ListMovie";
import ListMovieCover from "../../components/ListMovieCover";
import { useNavigation } from '@react-navigation/native';
import Colors from '../../theme/Colors';
import Header from '../../components/Header';


function SectionMovie({title, url}) {
	const navigation = useNavigation(); 
	return (
		<View style={styles.section}>
			<View style={styles.headerSection}>
				<Text style={styles.heading}>{title}</Text>
				<TouchableOpacity onPress={() => navigation.push("ListAll", {
					url: url
				})}>
					<Text style={{color: Colors.whiteBackground}}>Xem tất cả</Text>
			</TouchableOpacity>
			</View>
			<ListMovie url={url} />
		</View>
	)
}

function Home() {
	const url = 'https://api.themoviedb.org/3/movie/';
	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Oswald_600SemiBold
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<SafeAreaView style={styles.container}>
			<View style={{paddingHorizontal: "2%", alignSelf: "center"}}>
				<Header />
				<ScrollView showsVerticalScrollIndicator ={false}>
					<View style={styles.section}>
						<View style={styles.headerSection}>
							<Text style={styles.heading}>Phổ biến</Text>
							<TouchableOpacity onPress={() => navigation.push("ListAll", {
								url: url
							})}>
								<Text style={{color: Colors.whiteBackground}}>Xem tất cả</Text>
						</TouchableOpacity>
						</View>
						<ListMovieCover url={`${url}popular`} />
					</View>
					<SectionMovie title="Đang chiếu rạp" url={`${url}now_playing`}/>
					<SectionMovie title="Thịnh hành" url="https://api.themoviedb.org/3/trending/all/day" />
					<SectionMovie title="Được đánh giá cao" url={`${url}top_rated`} />
					<SectionMovie title="Sắp ra mắt" url={`${url}upcoming`} />
				</ScrollView>
			</View>
			</SafeAreaView>
	)}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	heading: {
		fontFamily: "Inter_600SemiBold",
		color: "#fff",
		fontSize: 20,
		marginBottom: 10,
	},
	headerSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	section: {
		marginTop: 20,
	}
});

export default Home;
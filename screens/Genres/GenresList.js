import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	KeyboardAvoidingView
} from "react-native";
import Constants from "expo-constants";
import GenresItem from "../../components/GenresItem";
import Colors from '../../theme/Colors';
// import TypeMovie from "./TypeMovie";


function GenresList({ navigation }) {
	const [loading, setLoading] = useState(true);
	const [genres, setGenres] = useState([{ id: "id", name: "null" }]);
	const url =
		"https://api.themoviedb.org/3/genre/movie/list?api_key=88ea40d51844508192d5da0027b574a4&language=vi-VN";

	const getGenresFromAPI = async () => {
		try {
			const res = await fetch(url);
			const res_1 = await res.json();
			setGenres(res_1.genres);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	useEffect(() => {
		getGenresFromAPI();
	}, [genres]);


	return (
		<SafeAreaView style={styles.container}>
		<KeyboardAvoidingView enabled behavior="padding">
			{loading ? (
				<ActivityIndicator size="large" loading={loading} />
			) : (
				<FlatList
					style={styles.list}
					data={genres}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<GenresItem name={item.name} onPress={() => navigation.push("ListAll", {
							url: `https://api.themoviedb.org/3/genre/${item.id}/movies`
						})} />
					)}
				/>
			)}
		</KeyboardAvoidingView>
	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: Constants.statusBarHeight,
		backgroundColor: Colors.black,
	},
	list: {
		width: "100%",
		backgroundColor: Colors.black,
	},
});

export default GenresList;

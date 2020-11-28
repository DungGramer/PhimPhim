import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	SafeAreaView,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	KeyboardAvoidingView,
	TextInput,
	Image,
	Dimensions
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from "expo-constants";
import Colors from '../../theme/Colors';

const { width, height } = Dimensions.get("window");

const filterForUnique = (arr) => {
	const cleaned = [];
	arr.forEach((item) => {
		let unique = true;
		cleaned.forEach((item2) => {
			const isEqual = JSON.stringify(item.id) === JSON.stringify(item2.id);
			if (isEqual) unique = false;
		});
		if (unique) cleaned.push(item);
	});
	return cleaned;
};

function ItemList({ title, poster_path, onPress }) {
	return(
		<TouchableOpacity style={styles.containerItemList} onPress={onPress}>
		<Image
			style={styles.image}
			source={{
				uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`,
			}}
		/>
		<Text style={styles.title}>{title}</Text>
	</TouchableOpacity>
	)
}

function Search() {
	const navigation = useNavigation();
	const [search, setSearch] = useState({
		// 's' ý nghĩa là gì??
		s: "",
		results: [],
	});
	const [page, setPage] = useState(1);
	const [lastPageReached, setLastPageReached] = useState(false);
	let lastPage;

	const getSearch = async () => {
		try {
			const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=88ea40d51844508192d5da0027b574a4&language=vi-VN&query=${search.s}&page=${page}`);
			const res_1 = await res.json();
			lastPage = res.total_pages;

			if(Number(page) == 1) {
				setSearch(res_1.results);
			} else if (Number(page) < Number(lastPage)) {
				const newList = filterForUnique(list.concat(res_1.results));
				setSearch(newList);
				setPage(page + 1);
			}
		} catch (err) {
			console.log(err);
		}
	}

	// Dóng hàng??
useEffect(() => {
}, [search]);

	return (
		<SafeAreaView style={styles.container}>
		<View style={styles.searchContainer}>
			<Ionicons name="md-arrow-back" size={24} color="#fff" style={{flex: 0.5, marginRight: 15,}} />
			<TextInput style={styles.searchBox} placeholder="Tìm kiếm..." placeholderTextColor={Colors.whiteBackground}
				onChangeText={text => setSearch(prevState => {
					return {...prevState, s: text}
				}) }
				onSubmitEditing={getSearch}
				value={search.s}
			 />
			<Ionicons name="md-search" size={24} color="#fff" style={{flex: 0.5, marginLeft: 15,}} />
		</View>
		<FlatList
			showsVerticalScrollIndicator ={false}
			contentContainerStyle={styles.list}
			data={search}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => (
				<ItemList title={item.title} poster_path={item.poster_path} onPress={() => navigation.push("DetailMovie", {
					id: item.id,
					title: item.title
				})}  />
			)}
		/>
	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
		// paddingTop: Constants.statusBarHeight,
	},
	searchContainer: {
		backgroundColor: Colors.blackBackground,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: "2%",
	},
	searchBox: {
		fontSize: 18,
		flex: 9,
		height: 50,
		backgroundColor: Colors.blackBackground,
		color: '#fff',
	},
	containerItemList: {
		height: 100,
		flexDirection: "row",
		borderBottomColor: "#ffffff50",
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	image: {
		height: "100%",
		aspectRatio: 0.9,
		resizeMode: "contain"
	},
	title: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold"
	}
});

export default Search;

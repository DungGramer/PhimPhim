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
import Movie from './Movie';
import Colors from '../theme/Colors';
import Header from '../components/Header';

function TypeMovie({ route, navigation }) { 
	const {id, name, url} = route.params;
	const [list, setList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [lastPageReached, setLastPageReached] = useState(false);

	const filterForUnique = (arr) => {
		const cleaned = [];
		arr.forEach((item) => {
			let unique = true;
			// Vòng lặp 2 tầng lớp, ngoài ra lại còn sử dụng JSON.stringify để so sánh,
			// và không có early exit (vì sử dụng foreach thay vì sử dụng vòng lặp for).
			// Ngoài ra, vấn đề lớn hơn ở đây là nếu sử dụng item.id để phân biệt các 
			// item khác nhau, thì nên sử dụng Object hoặc Map, và nếu cần giữ nguyên
			// thứ tự của các phần tử trong object thì nên sử dụng OrderedMap.
			cleaned.forEach((item2) => {
				const isEqual = JSON.stringify(item.id) === JSON.stringify(item2.id);
				if (isEqual) unique = false;
			});
			if (unique) cleaned.push(item);
		});
		return cleaned;
	};


	const loadList = async () => {
		// const url = `https://api.themoviedb.org/3/genre/${id}/movies?api_key=88ea40d51844508192d5da0027b574a4&language=vi-VN&page=${page}`;
			try {
				// Để API key bên trong code thay vì để ra 1 file riêng hoặc để trong 1 
				// hằng riêng?
				const res = await fetch(`${url}?api_key=88ea40d51844508192d5da0027b574a4&language=vi-VN&page=${page}`);
				const res_1 = await res.json();
				const lastPage = res_1.total_pages;

				if(Number(page) == 1) {
					setList(res_1.results);
				} else if (Number(page) < Number(lastPage)) {
					const newList = filterForUnique(list.concat(res_1.results));
					setList(newList);
				}

				// setList(res_1.results);
				setPage(page + 1);

			} catch(err) {
				console.log(err);
			}
			setLoading(false);
	}

	useEffect(() => {
		loadList();
	}, [list]);

	return(
		<SafeAreaView style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" loading={loading} />
			) : (
				<>
				<Header />
				<FlatList
					showsVerticalScrollIndicator ={false}
					numColumns={2}
					contentContainerStyle={styles.list}
					data={list}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<Movie title={item.title} poster_path={item.poster_path} onPress={() => navigation.push("DetailMovie", {
							id: item.id,
							title: item.title
						})}  />
					)}
					onEndReachedThreshold={1}
					onEndReached={loadList}
				/>
				</>
			)}
	</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignSelf: "center",
		width: "100%",
		marginHorizontal: 15,
		backgroundColor: Colors.black
	},
	list: {
		// Sử dụng ngoặc đơn thay vì ngoặc kép. Chọn 1 trong 2 rồi sau đó phải
		// theo đúng quy tắc.
		justifyContent: 'center',
	}
})
export default TypeMovie;
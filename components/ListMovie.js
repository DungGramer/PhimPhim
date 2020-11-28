import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Nên sử dụng hook useWindowDimensions() thay vì get dimensions 1 lần ở đây
const { width, height } = Dimensions.get("window");

function MovieItem({image, title, onPress}) {
	// Ví dụ
	const { width } = useWindowDimensions()
	return(
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Image source={{ uri: image}} style={styles.image} />
			<Text style={styles.title} numberOfLines={2}>{title}</Text>
		</TouchableOpacity>
	)
}

function ListMovie({url}) {
	const [list, setList] = useState();
	const [loading, setLoading] = useState(true);

	const navigation = useNavigation(); 

	const loadList = async () => {
		fetch(`${url}?api_key=88ea40d51844508192d5da0027b574a4&language=vi-VN`)
		.then(res => res.json())
		.then(res => {
			setList(res.results);
		}).catch(err => console.log(err));
		// Chương trình xảy ra lỗi hiện tại chỉ mới có log ra console chứ không hiển
		// thị lỗi cho người dùng.
		setLoading(false);
	}

	useEffect(() => {
		loadList();
	}, [list]);

	return(
		<View>
			{loading ? (
				<ActivityIndicator size="large" loading={loading} />
			) : (
				<FlatList 
					horizontal
					showsHorizontalScrollIndicator={false}
					data={list}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => (
						<MovieItem image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${item.poster_path}`} title={item.title} onPress={() => navigation.push("DetailMovie", {
							id: item.id,
							title: item.title
						})}  />
					)}
				/>
			)}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		marginRight: 10,
		width: (width - 150) / 2,
		alignItems: "center",
		
	},
	image: {
		width: (width - 150) / 2,
		height: width - 220, 
		resizeMode: "cover",
		borderRadius: 5,
		overflow: "hidden",
	},
	title: {
		color: "#fff",
		textAlign: "center"
	}
})

export default ListMovie;
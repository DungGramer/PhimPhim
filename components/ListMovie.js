import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

function MovieItem({image, title, onPress}) {
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
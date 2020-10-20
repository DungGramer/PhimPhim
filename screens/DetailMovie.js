import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	Image,
	ActivityIndicator,
	Dimensions,
	ImageBackground,
	View,
	ScrollView,
	TouchableOpacity
} from "react-native";

import Colors from "../theme/Colors";
import Hashtag from '../components/Hashtag';

import { LinearGradient } from "expo-linear-gradient";

import {
	useFonts,
	Inter_400Regular,
	Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
	Oswald_600SemiBold,
} from "@expo-google-fonts/oswald";
import { AppLoading } from "expo";

import ListMovie from '../components/ListMovie';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window");

function DetailMovie({ route, screen }) {
	const navigation = useNavigation(); 

	const { id, title } = route.params;
	const [info, setInfo] = useState([]);
	const [loading, setLoading] = useState(true);
	const url = `https://api.themoviedb.org/3/movie/${id}?api_key=88ea40d51844508192d5da0027b574a4&language=vi-VN`;

	const loadInfo = async () => {
		try {
			const res = await fetch(url);
			const res_1 = await res.json();
			setInfo(res_1);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	useEffect(() => {
		loadInfo();
	}, [info]);

	let [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
		Oswald_600SemiBold
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {

		return (
			<ScrollView style={styles.container} showsVerticalScrollIndicator ={false}>
				{loading ? (
					<ActivityIndicator size="large" loading={loading} />
				) : (
					<>
						<View style={styles.topContainer}>
							<Image
								source={{
									uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${info.backdrop_path}`,
								}}
								style={styles.image}
							/>
						</View>
						<LinearGradient
								colors={["transparent", "#17141485", Colors.black, Colors.black]}
								style={styles.linearGradient}
						/>
						<View style={styles.bottomContainer}>
							<View style={[styles.flexRow, styles.flexEnd]}>
								<Text style={styles.imdbScore}>{info.vote_average}</Text>
								<Text style={styles.imdbScoreOverall}>/10</Text>
								<Text style={styles.imdb}> IMDb</Text>
							</View>
							<Text style={styles.title}>{title}</Text>
							<View style={[styles.flexRow, styles.info]}>
								<Hashtag name={info.genres[0].name} />
								<Text style={styles.textWhite}>{info.runtime} phút</Text>
							</View>

						<TouchableOpacity style={styles.button} onPress={() => navigation.push("VideoPlayer", {
							id: id
						})}>
								<Text style={styles.buttonText}>Xem phim</Text>
						</TouchableOpacity>

						<Text style={styles.overview} >
							{info.overview}
						</Text>
						<View style={{marginTop: 20 }}>
							<Text style={styles.heading}>Nội dung liên quan</Text>
							<ListMovie url={`https://api.themoviedb.org/3/movie/${id}/similar`} />
						</View>

						<View style={{marginTop: 20 }}>
							<Text style={styles.heading}>Có thể bạn sẽ thích</Text>
							<ListMovie url={`https://api.themoviedb.org/3/movie/${id}/recommendations`} />
						</View>

						</View>
					</>
				)}
			</ScrollView>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	topContainer: {
		height: (height - 150) / 2,
		width,
	},
	image: {
		width: "100%",
		height: height - 200,
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 5,
	},
	bottomContainer: {
		flex: 1,
		paddingHorizontal: 20,
		position: "relative",
		zIndex: 9,
	},
	flexRow: {
		flexDirection: "row",
	},
	flexEnd: {
		alignItems: "flex-end",
	},
	linearGradient: {
		height: height / 2,
		width,
		position: "absolute",
		top: 150,
		left: 0,
		zIndex: 6,
	},
	textWhite: {
		color: "#fff",
	},
	imdbScore: {
		fontFamily: 'Inter_600SemiBold',
		fontSize: 18,
		color: "#fff"	
	},
	imdbScoreOverall: {
		fontFamily: 'Inter_600SemiBold',
		fontSize: 15,
		color: "#ffffff80"
	},
	imdb: {
		fontFamily: 'Inter_600SemiBold',
		fontSize: 18,
		color: "#ffba00",
	},
	title: {
		fontFamily: "Oswald_600SemiBold",
		textTransform: 'uppercase',
		fontSize: 40,
		color: "#fff",
		lineHeight: 56,
		marginVertical: 15,
	},
	info: {
		alignItems: "center",
		justifyContent: "space-between"
	},
	overview: {
		marginTop: 20,
		fontFamily: 'Inter_400Regular',
		fontSize: 15,
		color: "#fff",
		textAlign: "justify"
	},
	button: {
		backgroundColor: Colors.red,
		width: width - 75,
		alignSelf: "center",
		alignItems: "center",
		paddingVertical: 10,
		borderRadius: 20,
		marginTop: 20,
	},
	buttonText: {
		color: "#fff",
		textTransform: 'uppercase',
		fontWeight: "bold",
		fontSize: 15,
	},
	heading: {
		fontFamily: "Inter_600SemiBold",
		color: "#fff",
		fontSize: 18,
		marginBottom: 5,
	}
});

export default DetailMovie;

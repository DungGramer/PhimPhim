import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Video } from "expo-av";

function findURL(id, list) {
	return list.find((x) => x.id == id);
}

function VideoPlayer({ route }) {
	const { id } = route.params;
	const [url, setUrl] = useState();
	const [loading, setLoading] = useState(true);

	const getLink = async (id) => {
		try {
			const res = await fetch("https://dunggramer.github.io/PhimPhim/dataMovie.json");
			const res_1 = await res.json();
			let find = findURL(id, res_1.results);
			setUrl(find.url);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	useEffect(() => {
		getLink(id);
	}, [url]);

	return (
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator size="large" loading={loading} />
			) : (
				<Video
					source={{ uri: url }}
					resizeMode={"contain"}
					controls={true}
					useNativeControls
					paused={false}
					fullscreen={true}
					style={[styles.video, { height: "100%" }]}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	video: {
		width: "100%",
		backgroundColor: "black",
	},
});

export default VideoPlayer;

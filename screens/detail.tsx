import { StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation, RouteProp } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  Details: { id: string; title: string };
};

const DetailScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const route: RouteProp<RootStackParamList, 'Details'> = useRoute();

    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.reviewText}>Id: {route.params?.id}</Text>
            <Text style={styles.reviewText}>Title: {route.params?.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    reviewText:{
        fontSize: 25,
        padding: 15,
    }
});
export default DetailScreen;

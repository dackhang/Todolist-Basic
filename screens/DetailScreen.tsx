import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

const DetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Details'>>();

  return (
    <ImageBackground
      source={require('../assets/images/intropage.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.reviewText}>Id: {route.params?.id}</Text>
        <Text style={styles.reviewText}>Title: {route.params?.title}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: { 
    flex: 1,
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  reviewText: { 
    fontSize: 25, 
    paddingVertical: 10, 
    fontWeight: '600',
    color: '#000',
  },
});

export default DetailScreen;

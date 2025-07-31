import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import IntroScreen from '../screens/IntroScreen';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
    <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Todo List' }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: 'Task Detail' }} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

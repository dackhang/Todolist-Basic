import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

type IntroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Intro'
>;

const IntroScreen = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();

  const goToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <ImageBackground
      source={require('../assets/images/intropage.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Todo List</Text>
        <Text style={styles.desc}>
          Stay Organized, Stay Ahead Boost your productivity with our intuitive to-do list app. 
          Whether you're managing daily tasks, planning projects, or setting long-term goals,
           our app helps you stay on track with smart reminders.
          </Text>
        <TouchableOpacity style={styles.button} onPress={goToHome}>
          <Text style={styles.buttonText}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: 
  {
      flex: 1,
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: "center",
      padding: 20,
  },
  title: 
  {
      paddingLeft: 25,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  desc: 
  {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
  },
  button: {
    backgroundColor: '#da911a9b',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default IntroScreen;

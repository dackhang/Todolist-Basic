import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
  id: string;
  title: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const saveTasks = useCallback(async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Lỗi lưu:', error);
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('tasks');
      if (saved) setTasks(JSON.parse(saved));
    } catch (error) {
      console.error('Lỗi tải:', error);
    }
  };

  useEffect(() => { loadTasks(); }, []);
  useEffect(() => { saveTasks(); }, [tasks, saveTasks]);

  const addTask = () => {
    if (!task) {
      Alert.alert("Invalid information", "Please enter complete information!");
      return;
    }

    if (task.trim()) {
      const newTask: Task = { id: generateId(), title: task };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <ImageBackground
      source={require('../assets/images/intropage.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>📝 Todo List</Text>
        <TextInput
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
          style={styles.input}
        />
        <Button title="Add Task" onPress={addTask} />

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', { id: item.id, title: item.title })
              }
            >
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Icon name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: { 
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  taskText: { 
    fontSize: 16 
  },
});

export default HomeScreen;

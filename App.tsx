import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from './screens/detail';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
  id: string;
  title: string;
}

type RootStackParamList = {
  Home: undefined;
  Details: { id: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeScreen = ({ navigation }: any) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const TASK_KEY = '@mytasks';

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem(TASK_KEY);
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.log("Error loading tasks", error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(TASK_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.log("Error saving tasks", error);
      }
    };
    saveTasks();
  }, [tasks]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addTask = () => {
    if (!task) {
      Alert.alert("Thông tin không hợp lệ !", "Nội dung không được để trống");
      return;
    }
    const newTask: Task = { id: generateId(), title: task };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
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
            onPress={() => navigation.navigate('Details', { id: item.id, title: item.title })}
          >
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.title}</Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteText}>
                  <Icon name="trash" size={24} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    marginTop: 40 
  },
  title: { fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  input: { 
    borderWidth: 1, 
    padding: 8, 
    marginBottom: 10, 
    borderRadius: 6 
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
  },
  taskText: { 
    fontSize: 16 
  },
  deleteText: { 
    fontSize: 18, color: 'red' 
  },
});
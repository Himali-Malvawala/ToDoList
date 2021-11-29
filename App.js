import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleTask = async () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    await AsyncStorage.setItem('STORED', JSON.stringify([...taskItems, task]))
    setTask(null);
  }

  const taskFinished = async (index) =>{
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    await AsyncStorage.setItem('STORED', JSON.stringify(itemsCopy))
    setTaskItems(itemsCopy);
  }

  useEffect(() => {
      (async () => {
        const readingValue = await AsyncStorage.getItem('STORED')
        setTaskItems(JSON.parse(readingValue) || [])
      })()
  }, [])

  return (
    <View style={styles.container}>
    <View style={styles.tasksWrapper}>
      <Text style={styles.mainTitle}>TO-DO LIST</Text>
      <View style={styles.items}>
        {/* this where tasks will come */}
        {
          taskItems.map((item, index) => {
            return(
              <TouchableOpacity key={index} onPress={() => taskFinished(index)}>
              <Task text={item}/>
              </TouchableOpacity>
            )
          })
        }

      </View>
    </View>
    <View style={styles.writeTaskWrapper}>
      <TextInput style={styles.input} placeholder={"Write a Task"} value={task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={() => handleTask()}>
      <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
      </View>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal:20,
  },
  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal:20,
    backgroundColor: "#D9CAB3",
    width: 250,
    borderRadius:60,
    borderColor: "#C0C0C0",
    borderWidth: 2,
    textAlign: "center"
  },
  addWrapper: {
    height: 60,
    width: 60,
    backgroundColor: "#6D9886",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 2,
  },
  addText: {
    fontSize: 20,
    fontWeight: "300"
  },
  
});

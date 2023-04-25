import React,{useState} from 'react';
import { StyleSheet, Text, View,FlatList,Alert,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Header from './Components/header';
import Todo from './Components/todo';
import AddTodo from './Components/addTodo';
export default function App() {
  const [todos,setTodos] = useState([
    {text:'buy me a coffe',key:'1'},
    {text:'create a app',key:'2'},
    {text:'go for outing',key:'3'},
    
  ]);

  const pressHandler = (key) =>{
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);
    });
  }
  const submitHandler = (text) => {
    if(text.length > 3){
      setTodos((prevTodos) => {
        return [
          {text: text,key: Math.random().toString()},
          ...prevTodos
        ];
      });
    } else {
      Alert.alert('OOPS!','Todo must be over 3 characters long',[
        {text:'Understood',onPress: () => console.log('alert closed')}
      ]);
    }
}
  return (
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
    }}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler}/>
            <View style={styles.list}>
              <FlatList 
                data={todos}
                renderItem={({ item }) => (
                  <Todo item={ item } pressHandler={pressHandler}/>
                )}
              />
            </View>
          </View>
          
        </View> 
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content : {
    padding: 40,
    backgroundColor:'lightyellow',
    flex:1,
  },
  list : {
    flex:1,
    marginTop : 20,
    backgroundColor:'lightpale'
  }
});

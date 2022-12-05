import { Button, StyleSheet, Text, TextInput, FlatList, View, ScrollView } from 'react-native';
import Lottie from 'lottie-react-native';
import moment from "moment";
import { useState } from 'react';
import { Provider } from 'react-redux';
import Counter from './src/Counter';
import { store } from './src/store/store';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function App() {
  const [enterGoal,setenterGoal] = useState('')
  const [courseGoals,setCourseGoals] = useState([]);
  function goalInputHandler(enterText)  {
    setenterGoal(enterText)
  }
  function addGoalHandler() {
      setCourseGoals((currentCourseGoals) => [...currentCourseGoals,
        {text : enterGoal, id : Math.random().toString()},
      ]);
      console.log(courseGoals)
  }
  return (
    <View style={styles.appContainer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Your Course Goal'style={styles.textInput} onChangeText={goalInputHandler}/>
          <Button title="Add Goal" onPress={addGoalHandler}/>
        </View>
        <View style={styles.goalsContainer}>
        <Lottie source={require('./animation.json')} style={styles.lottieAnimation} autoPlay loop />
        <FlatList data={courseGoals}   renderItem={(itemData)=>{
            return (
              <Text style={styles.goalItem}>{itemData.item.text}</Text>
            )
            }}
            alwaysBounceVertical={false}
            />

        </View>
        <ScrollView>
        <Text style={styles.momentContainer}>
          {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <Provider store={store}>
              <Counter/>
            </Provider>
           <Text>
           <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
           </Text>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer : {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 60
  },
  inputContainer : {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '70%',
    marginRight: 8,
    padding: 8
  },
  lottieAnimation : {
    position: 'relative'
  },
  goalsContainer: {
    flex: 4
  },
  goalItem: {
    margin: 8,
    padding: 8,
    color: 'white',
    borderRadius: 6,
    backgroundColor: '#5e0acc'
  },
  momentContainer : {
    margin: 10,
  }
})


function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
        res.json()
      )
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <View>
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
      <Text>👀 {data.subscribers_count}</Text>
      <Text>✨ {data.stargazers_count}</Text>
      <Text>🍴 {data.forks_count}</Text>
    </View>
  )
}
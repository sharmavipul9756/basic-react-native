import { StyleSheet, View, Text, Button } from "react-native";
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addition, Addition, subtraction, Subtraction } from "./store/action";

const Counter = (props) => {
   const data = useSelector((state)=>state.counter)
   const dispatch=  useDispatch();
  return (
   <View>
   <Button title="Add Count" onPress={()=>dispatch(addition())}/>
   <Text>{data}</Text>
   <Button title="Subtract Count" onPress={()=>dispatch(subtraction())}/>
  </View>
  )
}

export default Counter
import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import * as firebase from 'firebase';
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
          emailId : '',
          password: ''
        }
      }
    login = async (email, password)=>{
        if(email&&password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
this.props.navigation.navigate("Transaction")
                }
            }
            catch(error){
                switch (error.code) {
                    case 'auth/user-not-found':
                      alert("user dosen't exists")
                      console.log("doesn't exist")
                      break
                    case 'auth/invalid-email':
                      alert('incorrect email or password')
                      console.log('invaild')
                      break
            }
        }
    }
        else{
            alert("Enter email & password")
        }
    }
    render(){
        return(
          <KeyboardAvoidingView>
              <View>
                <Image source={require("../assets/booklogo.jpg")}
               style={{width:200, height: 200}}/>
               <Text> Wireless Library </Text>
              </View>
              <View>
                  <TextInput 
                  placeholder="testemail@gmail.com"
                  keyboardType="email-address"
                  onChangeText={(text)=>{
                    this.setState({
                      emailId: text
                    })
                  }}
                  />
                <TextInput 
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                      password: text
                    })
                  }}
                />

              </View>

              <View>
                  <TouchableOpacity
                  onPress ={()=>{
                      this.login(this.state.emailId,this.state.password)
                  }}>
                    <Text>
                        Login
                    </Text>
                  </TouchableOpacity>
              </View>
          </KeyboardAvoidingView>
        
        )
    }
}
        
   
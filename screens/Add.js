import React,{useState} from 'react'
import {Text,StyleSheet,ScrollView} from 'react-native'
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  H1
} from 'native-base'
import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage'
import Snackbar from 'react-native-snackbar'


const Add=({navigation,route})=>{
  const [name,setName]=useState('')
  const [totalNoSeason,setTotalNoSeason]=useState('')

  const addTolist=async()=>{
    try{
      if(!name ||!totalNoSeason){
        // return alert('please add both fields')
        //Todo :add snackbar here
        return Snackbar.show({
        text: "enter both values",
        backgroundColor: "red",
        textColor: "#FFF"
      })

      }
      const seasonToadd={
        id:shortid.generate(),
        name:name,
        totalNoSeason:totalNoSeason,
        isWatched:false,
      }
      const storedValues=await AsyncStorage.getItem('@season_list')
      const prevList=await JSON.parse(storedValues)

      if(!prevList){
        const newList=[seasonToadd]
        await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
      }else{
        prevList.push(seasonToadd)
        await AsyncStorage.setItem('@season_list',JSON.stringify(prevList))
      }
      setName('')
      setTotalNoSeason('')
      navigation.navigate('Home')
    }catch (e){
      console.log(e)

    }
  }

    return(
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow:1}}>
            <H1 style={styles.heading}>Add to watchlist</H1>
            <Form>
              <Item rounded style={styles.formItem}>
                <Input value={name} onChangeText={(text)=>setName(text)} placeholder="Season name" style={{color:"#eee"}}></Input>
              </Item>
               <Item rounded style={styles.formItem}>
                <Input value={totalNoSeason} onChangeText={(text)=>setTotalNoSeason(text)} placeholder="Total number of seasons" style={{color:"#eee"}}></Input>
              </Item>
              <Button rounded block onPress={addTolist}>
                <Text style={{color:"#EEE"}}>Add</Text>
              </Button>
            </Form>
          </ScrollView>
        </Container>
    )
}

export default Add

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
});

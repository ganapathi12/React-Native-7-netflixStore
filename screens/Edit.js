import React,{useState,useEffect} from 'react'
import {StyleSheet,ScrollView} from 'react-native'
import {
  Text,
  List,
  ListItem,
  Left,
  Button,
  Icon,
  Body,
  Right,
  CheckBox,
  Title,
  H1,
  Fab,
  Subtitle,
  Container,
  Spinner,
  Form,
  Item,
  Input
 } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

const Edit=({navigation,route})=>{
  const [name, setName] = useState('')
  const [totalNoSeason, setTotalNoSeason] = useState('')
  const [id, setId] = useState(null)

  const update=async()=>{
    try{
      if(!name || !totalNoSeason){
        return Snackbar.show({
        text: "enter both values",
        backgroundColor: "red",
        textColor: "#FFF"
      })
      }
      const seasontoUpdate={
        id,
        name,
        totalNoSeason,
        isWatched:false
      }
       const storedValues=await AsyncStorage.getItem('@season_list')
       const list=await JSON.parse(storedValues)

       list.map((singleseason)=>{
         if(singleseason.id==id){
           singleseason.name=name
           singleseason.totalNoSeason=totalNoSeason
         }
         return singleseason
       })

       await AsyncStorage.setItem('@season_list',JSON.stringify(list))
       navigation.navigate("Home")

    }catch(e){
      console.log(e)
    }

  }

  useEffect(()=>{
    const {season}=route.params
    const {id,name,totalNoSeason} =season

    setId(id)
    setName(name)
    setTotalNoSeason(totalNoSeason)
  },[])
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
              <Button rounded block onPress={update}>
                <Text style={{color:"#EEE"}}>Update</Text>
              </Button>
            </Form>
          </ScrollView>
        </Container>
    )
}

export default Edit

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


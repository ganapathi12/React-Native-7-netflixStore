import React ,{useState,useEffect} from 'react'
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
  Image,
  View
 } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import {useIsFocused} from '@react-navigation/native'
import netflix from '../images/netflix.png'


const Home=({navigation,route})=>{

  const uri=netflix

  const [listofseasons,setListofseasons]=useState([])
  const [loading, setLoading] = useState(false)
  const isFocus=useIsFocused()

  const getlist=async()=>{
    setLoading(true)
    const storedvalue=await AsyncStorage.getItem('@season_list')
    if(!storedvalue){
      setListofseasons([])
    }
    const list=JSON.parse(storedvalue)
    setListofseasons(list)
    setLoading(false)
  }

  const deleteSeason=async(id)=>{
    const newList=await listofseasons.filter((list)=>list.id!==id)
    await AsyncStorage.setItem('@season_list',JSON.stringify(newList))
    setListofseasons(newList)
  }
  const markComplete=async(id)=>{
    const newArr=listofseasons.map((list)=>{
      if(list.id==id){
        list.isWatched=!list.isWatched
      }
      return list
    })

    await AsyncStorage.setItem('@season_list',JSON.stringify(newArr))
    setListofseasons(newArr)

  }

  useEffect(()=>{
    getlist()
  },[isFocus])

  if(loading){
    return(
      <Container style={styles.container}>
        <Spinner color="#00b7c2"/>
      </Container>
    )
  }

    return(
        <ScrollView contentContainerStyle={styles.container}>
          {listofseasons.length==0?(
            <Container style={styles.container}>
              <H1 style={styles.heading}>
                Watchlist is empty please add the season!
              </H1>
            </Container>
          ):(
            <>
            <H1 style={styles.heading}>Next series to watch</H1>
            <List>
             {listofseasons.map((season)=>(
                <ListItem key={season.id} style={styles.listItem} noBorder>
                <Left>
                  <Button
                  style={styles.actionButton}
                  danger
                  onPress={()=>deleteSeason(season.id)}
                  >
                    <Icon name="trash" active/>
                  </Button>
                  <Button
                  style={styles.actionButton}
                  onPress={()=>{
                    navigation.navigate('Edit',{season})
                  }}
                  >
                    <Icon active name="edit" type="Feather"/>
                  </Button>
                </Left>
                <Body>
                  <Title style={styles.seasonName}>{season.name}</Title>
                  <Text note>{season.totalNoSeason}</Text>
                </Body>
                <Right>
                  <CheckBox
                  checked={season.isWatched}
                  onPress={()=>markComplete(season.id)}
                  />
                </Right>
              </ListItem>
             ))}
            </List>
            </>
          )}
          
          <Fab
          style={{backgroundColor:'#5067FF'}}
          position="bottomRight"
          onPress={()=>navigation.navigate('Add')}
          >
            <Icon name="add"/>
          </Fab>
         
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});

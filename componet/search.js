import React from "react"
import {StyleSheet,View,Button,TextInput, FlatList} from 'react-native'
import Films from '../helpers/FilmData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../api/TMDBApi'

class Search extends React.Component{
  constructor(props){
    super(props)
    this.state={
      Films:[]
    }
    this.searchedText = ""
  }
  _loadFilms() {
    if (this.searchedText.length>0) {
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({ films: data.results })
      })
    }
  }
  _searchTextInputChanged(text){
    this.searchedText = text
  }
  render(){
    console.log("RENDER")
    return(
      <View style={styles.main_container}>
        <TextInput 
            style={styles.textinput}
            placeholder='Titre du film'
            onChangeText={(text) => this._searchTextInputChanged(text)}
        />
        <Button style={styles.Button} title="rechercher" onPress={()=>this._loadFilms()}/>
        <FlatList
            data={Films}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmItem Films={item} />}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
    main_container :{
      marginTop:20,
      flex:1
    },
    textinput : {
      marginLeft:5,
      marginRight:5,
      height:30,
      borderColor:'#000',
      borderWidth:1,
      paddingLeft:5
    },
    Button :{
      height:50
    }
});
export default Search
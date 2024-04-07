import { Dimensions, Image, StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const windowWidth = (Dimensions.get('window').width) / 3.25;
const windowHeight = (Dimensions.get('window').height) / 3.25;
const myHeight = (windowWidth > windowHeight) ? windowWidth : windowHeight;

const VdoItem = (props) => {
    const navigationHook = useNavigation();
    const myFun=(navHook)=>{

        navHook.navigate('Player', {name: "Navigated from HomeScreen Btn!", vdourl: props.vdourl});
    }
  return (
    <TouchableOpacity onPress={()=> myFun(navigationHook)} >
        <View style={{flex: 1, marginRight: 10, borderRadius: 10, overflow: 'hidden'}}>
            
            <View style={{flex:3}}>
                <Image source={{uri: props.imgUrl}} style={{width: myHeight,height: '100%',resizeMode: 'stretch'}} />
            </View>
            <View style={{flex:.5, flexDirection:'row', backgroundColor:'white', padding: 10, justifyContent: 'space-between', alignItems:'center'}}>
                <Text style={{fontWeight:"bold", color:'black', borderRadius: 100, borderWidth:2, borderColor: 'red', paddingHorizontal: 15, paddingVertical: 5, textTransform:'uppercase',}}>{props.title}</Text>
                
                    {/* <View style={{borderRadius: 100, borderWidth:2, borderColor: 'red', padding:5,flex: 1, justifyContent:'center', alignItems:'center', paddingRight:4}}>
                        <Ionicons name="play" style={{color: "red"}} size={15} />
                    </View>  */}
            </View>

        </View>
    </TouchableOpacity>
  )
}

export default VdoItem;

const styles = StyleSheet.create({})
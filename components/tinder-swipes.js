import React, { useState, useEffect } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Icon } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TinderDetailScreen from '../screens/tinder-detail-screen';


// DUMMY DATA
const DUMMY_DATA1 =  [
  {
      "id": 1,
      "pet": {
          "uuid": "s8fdc36a-9d33-4e4e-a338-5f426482ebbe",
          "species": "貓",
          "species_general": "猫",
          "name": "Refuse",
          "age": 25,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "新莊2",
          "description": "25",
          "headimg": "…",
          "updated_at": "2024-02-27T05:49:27.158796Z",
          "institution": "f37829c5-a662-4319-92c7-22aa8643bd7c"
      },
      "updated_at": "2024-03-02 14:30:08",
      "status": "機構審查拒絕"
  },
  {
      "id": 2,
      "pet": {
          "uuid": "k8fdc36a-9d33-4e4e-a338-5f426482ebbe",
          "species": "貓",
          "species_general": "猫",
          "name": "Run",
          "age": 25,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "新莊2",
          "description": "25",
          "headimg": "…",
          "updated_at": "2024-02-27T05:49:27.158796Z",
          "institution": "f37829c5-a662-4319-92c7-22aa8643bd7c"
      },
      "updated_at": "2024-03-02 14:30:08",
      "status": "機構審查(中)",
  },
 {
  "id": 3,
  "pet": {
      "uuid": "h8fdc36a-9d33-4e4e-a338-5f426482ebbe",
      "species": "貓",
      "species_general": "猫",
      "name": "Pass",
      "age": 25,
      "weight": 60.0,
      "vaccined": true,
      "currentloc": "新莊2",
      "description": "25",
      "headimg": "…",
      "updated_at": "2024-02-27T05:49:27.158796Z",
      "institution": "f37829c5-a662-4319-92c7-22aa8643bd7c"
  },
  "updated_at": "2024-03-02 14:30:08",
  "status": '機構審查批准',
}

]

const DUMMY_DATA2 = [
  {
      "id": 4,
      "pet": {
          "uuid": "g8fdc36a-9d33-4e4e-a338-5f426482ebbe",
          "species": "貓",
          "species_general": "猫",
          "name": "Refuse1",
          "age": 25,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "新莊2",
          "description": "25",
          "headimg": "…",
          "updated_at": "2024-02-27T05:49:27.158796Z",
          "institution": "f37829c5-a662-4319-92c7-22aa8643bd7c"
      },
      "updated_at": "2024-03-02 14:30:08",
      "status": "機構審查拒絕"
  },
  {
      "id": 5,
      "pet": {
          "uuid": "d8fdc36a-9d33-4e4e-a338-5f426482ebbe",
          "species": "貓",
          "species_general": "猫",
          "name": "Run2",
          "age": 25,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "新莊2",
          "description": "25",
          "headimg": "…",
          "updated_at": "2024-02-27T05:49:27.158796Z",
          "institution": "f37829c5-a662-4319-92c7-22aa8643bd7c"
      },
      "updated_at": "2024-03-02 14:30:08",
      "status": "機構審查(中)",
  },
 {
  "id": 6,
  "pet": {
      "uuid": "e8fdc36a-9d33-4e4e-a338-5f426482ebbe",
      "species": "貓",
      "species_general": "猫",
      "name": "Pass3",
      "age": 25,
      "weight": 60.0,
      "vaccined": true,
      "currentloc": "新莊2",
      "description": "25",
      "headimg": "…",
      "updated_at": "2024-02-27T05:49:27.158796Z",
      "institution": "f37829c5-a662-4319-92c7-22aa8643bd7c"
  },
  "updated_at": "2024-03-02 14:30:08",
  "status": '機構審查批准',
}
]


const Swipes = ({currentIndex,swipesRef})=>{
    [modalVisible,setModalVisible] = useState(false);
    [Data, setData] = useState(DUMMY_DATA1);
    [tapData, setTapData] = useState(Data[0]);
    [key, setKey] = useState(0);
    const safecard =   {
      "id": 3141592654,
      "pet": {
          "uuid": "d8fdc36a-9d33-4e4e-a338-5f426482ebbe",
          "species": "貓",
          "species_general": "猫",
          "name": "我是志工狗狗",
          "age": 1,
          "weight": 60.0,
          "vaccined": true,
          "currentloc": "汪汪星球",
          "description": "快去認識更多我的夥伴吧",
          "headimg": "…",
      },
      "status": ""
  }

    // Fethcing data
    const fetchData = async () =>{
      fetch("....",{
        method:"GET",
      }).then(res=>{return(res.json());
      }).then(res=>{setData(res);
      }).catch(err=>{console.log(err);})
    }

    // Functions
    const saveLikeCard = async(idx)=>{    
      if(idx === null){
        AsyncStorage.getItem("LikeCards")
        .then(res=>{
          const arr = res? JSON.parse(res) : [];
          arr.push(safecard);
          AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
        })
      }else if(idx<Data.length-1){
        AsyncStorage.getItem("LikeCards")
        .then(res=>{
          const arr = res? JSON.parse(res) : [];
          if(! containsObject(Data[idx],arr)){
            arr.push(Data[idx]);
            AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
          }
        })
      }
    }
    
    const handleRightSwipe = async (idx)=>{
      saveLikeCard(idx);
    }

    const handleSwipeAll = async()=>{
      //fetchData();
      AsyncStorage.getItem("LikeCards")
        .then(res=>{
          const arr = res? JSON.parse(res) : [];
          if(!containsObject(Data[Data.length-1],arr)){
            arr.push(Data[Data.length-1]);
            AsyncStorage.setItem("LikeCards",JSON.stringify(arr));
            // Then fetch data here and set the data
            setData(DUMMY_DATA2);
            setKey(key+0.01);
          }else{
            // Then fetch data here and set the data
            setData(DUMMY_DATA2);
            setKey(key+0.01);
          }
        })
    }

    const handleOnTap = (idx)=>{
      setTapData(Data[idx]);
      setModalVisible(true);
    }

    const containsObject=(obj, list)=>{
      var i;
      for (i = 0; i < list.length; i++) {

          if (list[i].pet.uuid === obj.pet.uuid) {
              return true;
          }
      }
      return false;
  }
    // UseEffect
    useEffect(()=>{
      saveLikeCard(null);
      console.log("A card is saved")
    },[])
    
    return(
        <View style={styles.swipes}>
            <Swiper
            key={key}
            ref={swipesRef}
            cards={Data}
            renderCard={(card) => {
                return (
                    <View style = {styles.card}>
                        <Image source={{ uri: card.pet.headimg }} style={styles.photo} />
                        <View style={styles.textContainer}>
                            <View style={styles.title_frame}>
                                <View style={styles.title}>
                                        <Text style={styles.title_name}>{card.pet.name}</Text>
                                        <Text style={styles.title_age}>{card.pet.age}</Text>
                                </View>
                            </View>

                            <View style={styles.detail_frame}>
                                <View style={styles.tags}>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.pet.species}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.pet.weight}</Text>
                                    </View>
                                    <View style={styles.tag}>
                                        <Text style={styles.tag_text}>{card.pet.vaccined?"已注射疫苗":"未注射疫苗"}</Text>
                                    </View>
                                </View>
                                <View style = {styles.location}>
                                    <Icon name='location' type='ionicon' color='white'/>
                                    <Text style={styles.loc_text}>{card.pet.currentloc}</Text>
                                </View>
                            </View>

                            <View style={styles.description_frame}>
                                <Text style={styles.description_text}>{card.pet.description.substring(0,22)}...</Text>
                            </View>
                        </View>
                    </View>
                )
            }}
            onSwipedRight={(cardIndex)=>{
              handleRightSwipe(cardIndex);
            }}
            onSwiped={(cardIndex) => {console.log("Swiped")}}
            onSwipedAll={()=>{
              handleSwipeAll();
            }}
            onTapCard={(cardIndex)=>{
              handleOnTap(cardIndex); 
            }}
            cardIndex={currentIndex}
            backgroundColor={'white'}
            stackSize= {3}>
            </Swiper>
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <TinderDetailScreen headimg={tapData.pet.headimg} species={tapData.pet.species} weight={tapData.pet.weight}
                    vaccined={tapData.pet.vaccined} adoptloc={tapData.pet.adoptloc} description={tapData.pet.description} name = {tapData.pet.name} age = {tapData.pet.age} matching_status={tapData.status}/>
                <TouchableOpacity style = {styles.goback_frame} onPress={()=>setModalVisible(false)}><Text style={styles.goback_text}>返回 &gt;</Text></TouchableOpacity> 
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    swipes: {
      flex: 1,
      padding: 5,
      paddingTop: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    container: {
      flex: 1,
      backgroundColor: "#F5FCFF"
    },
    card: {
      height:"75%", 
      marginTop:-30
    },
    text: {
      textAlign: "center",
      fontSize: 50,
      backgroundColor: "transparent"
    },
    photo: {
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 20,
    },
    textContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
    textRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textPrimary: {
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold',
    },
    textSecondary: {
      color: 'white',
      marginLeft: 10,
      fontSize: 25,
    },
    textShadow: {
      textShadowColor: 'rgba(0, 0, 0, 0.80)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    title_frame: {
      flexShrink: 0,
      width: 318,
      flexDirection: "row",
      alignItems: "flex-end",
      columnGap: 12
  },
    title:{
      flexShrink: 0,
      flexDirection: "row",
      alignItems: "center",
      columnGap: 20
    },
    title_name:{
      flexShrink: 0,
      textAlign: "left",
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "PingFang TC",
      fontSize: 32,
      fontWeight: "600",
      letterSpacing: 1.6
    },
    title_age:{
      flexShrink: 0,
      textAlign: "left",
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "PingFang TC",
      fontSize: 20,
      fontWeight: "600",
      letterSpacing: 1
    },
    detail_frame:{
      flexShrink: 0,
      alignItems: "flex-start",
      rowGap: 12
    },
    tags:{
      flexShrink: 0,
      flexDirection: "row",
      alignItems: "flex-start",
      columnGap: 8
    },
    tag:{
      flexShrink: 0,
      backgroundColor: "rgba(255, 234, 218, 1)",
      flexDirection: "row",
      alignItems: "center",
      columnGap: 10,
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8
    },
    tag_text:{
      flexShrink: 0,
      textAlign: "left",
      color: "rgba(237, 116, 34, 1)",
      fontFamily: "PingFang TC",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.6
    },
    location:{
      flexShrink: 0,
      flexDirection: "row",
      alignItems: "center",
      columnGap: 4
    },
    loc_text:{
      flexShrink: 0,
      textAlign: "left",
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "PingFang TC",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.7
    },
    description_frame:{
      flexShrink: 0,
      height: 17,
      width: 335,
      alignItems: "flex-start",
      rowGap: 0
    },
    description_text:{
      position: "absolute",
      flexShrink: 0,
      top: 0,
      right: 0,
      bottom: -3,
      left: 0,
      textAlign: "left",
      color: "rgba(255, 255, 255, 1)",
      fontFamily: "PingFang TC",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.7
    },
    goback_frame:{
      position:"absolute", 
      top:55, 
      right:5,
    },
    goback_text:{
        color: "#808080",
        fontFamily: "PingFang TC",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0
    }
  
  });

export default React.forwardRef((props,ref)=><Swipes swipesRef = {ref} {...props}/>);

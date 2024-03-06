import React,{useState,useEffect} from 'react';
import { Text, View , TouchableOpacity, SafeAreaView,ScrollView,Image, TextInput,Modal,KeyboardAvoidingView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// formik
import { Formik } from 'formik';
// Styled components
import {
    Colors,
    Lefttextorange,

} from './../components/styles'
//colors
const {holderwords, orange,white,gray} = Colors;


     
    
const Setting = ()=>{

    const [text1, setText1] = useState('請介紹您自己讓機構更認識您!');
    const [modalVisible1, setModalVisible1] = useState(false);
    const handleOpenModal1 = () => {setModalVisible1(true);};
    const handleCloseModal1 = () => {setModalVisible1(false);};
    const handleSaveText1 = () => {handleCloseModal1();};
    
    const [selectedFrequency, setSelectedFrequency] = useState('每月一次');
    const [showOptions, setShowOptions] = useState(false);
    const FrequencyOptions = ['每周一次', '每月一次', '每半年一次', '永不提醒'];

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleChange = (frequency) => {
        setSelectedFrequency(frequency);
        setShowOptions(false);
    };

    const [date, setDate] = useState(new Date(3376699000000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
    showMode('date');
    };

    const [images, setImages] = useState([]);

  const handlePress = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('沒有權限');
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
        const asset = result.assets[0];
        setImages([...images, asset.uri]);
    }
  };

    return (
    <SafeAreaView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 ,height:'160%'}}>
            <View style={{flex:1,backgroundColor: 'white'}}>
                <Lefttextorange>吳執行長</Lefttextorange>    
            </View>

            <View style={{ height: 10 }}></View>
            <Text  style={{fontSize:20,left:20,color:orange}}>您的照片</Text>
            <View style={{ height: 10 }}></View>

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {images.map((uri, index) => (
                    <TouchableOpacity key={index} onPress={handlePress}>
                        <Image source={{ uri }} style={{ width: 150, height: 150, margin: 5, padding: 10, borderRadius: 50 }} />
                    </TouchableOpacity>
                ))}
  
                {images.length < 1 &&
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={require('./../assets/add.png')} style={{ height: 100, width: 100 }} />
                    </TouchableOpacity>
                }
            </View>

            <View style={{ height: 10 }}></View>
            <Text  style={{fontSize:20,left:20,color:orange}}>提醒設定</Text>
            <View style={{ height: 10 }}></View>

            <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                <TouchableOpacity 
                    style={{backgroundColor:'#fff',padding:10,borderRadius:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'80%',}}
                    onPress={handleToggleOptions}>
                    
                    <Text style={{fontSize:17}}>提醒頻率</Text>
                    <Text style={{fontSize:17,color:holderwords,textAlign:'left'}}>{selectedFrequency}</Text>

                    {showOptions && (
                        <View style={{ position: 'absolute', backgroundColor: '#fff', borderRadius: 10, padding: 10,width:'106%' }}>
                            {FrequencyOptions.map((frequency, index) => (
                                <TouchableOpacity key={index} onPress={() => handleChange(frequency)}>
                                    <Text style={{ fontSize: 18 ,padding: 2,textAlign:'right'}}>{frequency}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                    )}      
                </TouchableOpacity>
            </View>

            <View style={{ height: 10 }}></View>
            <Text  style={{fontSize:20,left:20,color:orange}}>個人設定</Text>
            

            
                <View style={{ height: 10 }}></View>
                <Formik
                    initialValues={{ name: '',id:'',address:'',address2:'',phone:'' }}
                    onSubmit={(values) => {
                    console.log(values);
                    }}>
                        
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{flex:5,flexDirection:'column',alignItems:'center'}}>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff', borderTopLeftRadius:10, borderTopRightRadius: 10, flexDirection: 'row',height:'15%', justifyContent:'center', alignItems: 'center', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10 }}>姓名</Text>
                        <TextInput
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder="請輸入您的姓名"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={showDatepicker} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'space-between', alignItems: 'center',height:'15%', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>生日</Text>
                        <Text style={{fontSize:17,color:holderwords,textAlign:'right'}}>  {date.toISOString().slice(0,10).replace(/-/g,"/")}  </Text>
                        {show && (
                            <DateTimePicker
                            value={date}
                            mode={mode}                         
                            onChange={onChange}
                            />
                        )}
                        
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'center', alignItems: 'center',height:'15%', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>身分證</Text>
                        <TextInput
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            value={values.id}
                            placeholder="請輸入您的身分證"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'center', alignItems: 'center',height:'15%', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>戶籍地址</Text>
                        <TextInput
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address}
                            placeholder="請輸入您的戶籍地址"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', justifyContent:'center', alignItems: 'center',height:'15%', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>通訊地址</Text>
                        <TextInput
                            onChangeText={handleChange('address2')}
                            onBlur={handleBlur('address2')}
                            value={values.address2}
                            placeholder="請輸入您的通訊地址"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: '#fff',  flexDirection: 'row', borderBottomLeftRadius:10,borderBottomRightRadius:10,justifyContent:'center', alignItems: 'center',height:'15%', width: '80%'}}>
                        <Text style={{ fontSize: 18,left:10  }}>手機</Text>
                        <TextInput
                            onChangeText={handleChange('phone')}
                            onBlur={handleBlur('phone')}
                            value={values.phone}
                            placeholder="請輸入您的手機號碼"
                            style={{ flex: 1, fontSize: 17, color: holderwords ,textAlign:'right',right:10}}
                        />
                        </TouchableOpacity>
                        
                        

                        </View> 
                    )}
                 </Formik>

                
                <Text  style={{fontSize:20,left:20,color:orange}}>個人設定</Text>
                
                <View style={{flex:2,flexDirection:'row',justifyContent: 'center',top:10}}>
            <TouchableOpacity onPress={handleOpenModal1} style={{ padding: 20, backgroundColor: '#fff',width:'80%',borderRadius:20,height:'70%'}}>
                <Text style={{fontSize:16,textAlign:'left',color:holderwords}}>{text1}</Text>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
                onRequestClose={handleCloseModal1}
                >
                    <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: white, padding: 20, borderRadius: 20 ,width:'80%',height:'40%'}}>
                            
                            <TextInput
                            multiline={true} 
                            style={{ height:'40%', backgroundColor:gray,textAlignVertical: 'top',padding:5, marginBottom: 20 ,borderRadius:15}}
                            onChangeText={setText1}
                            value={text1}
                            />
                            <TouchableOpacity onPress={handleSaveText1} style={{ padding: 10, backgroundColor:orange, alignItems: 'center', borderRadius: 5 ,}}>
                                <Text>保存</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
            </Modal>
                



               








                 
        </ScrollView>  
        </SafeAreaView>

  )
}
export default Setting;


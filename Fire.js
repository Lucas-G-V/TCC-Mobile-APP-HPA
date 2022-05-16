import React from 'react';
import {View, Text} from 'react-native';
import firebase from '@react-native-firebase/app';

 class Firebase1 extends Component{
    state={
        status:[]
    }
    componentDidMount(){
        firebase
        .database()
        .ref('temperatura')
        .on('value',(snapshot)=>{
            const status = (snapshot.val());
            this.setState((status));
        });

    }
    render(){
        return(
            <View>
                <Text>
                    {this.state.status}
                </Text>
            </View>
        )
    }

}
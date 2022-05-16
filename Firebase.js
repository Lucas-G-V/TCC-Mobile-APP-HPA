import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB0rigbRiy6w1xpK5Zit9lSG8iCIw1XKGQ",
    authDomain: "healthbook-e52bb.firebaseapp.com",
    databaseURL: "https://healthbook-e52bb-default-rtdb.firebaseio.com/",
    projectId: "healthbook-e52bb",
    storageBucket: "healthbook-e52bb.appspot.com",
    messagingSenderId: "1026924664485",
    appId: "1:1026924664485:web:b474b5b920a223e8e99f4c",
    measurementId: "G-FPQDZCL73W"
  };
  
  // Initialize Firebase
 if(!firebase.apps.length){
     firebase.initializeApp(firebaseConfig);
 }


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

export default Firebase1;
 
 
 
 
 
 
 
 /*
 export class Firebase extends Component { 
     state={
     status: []}
    ComponentDidMount() {
        firebase
        .database()
        .ref('temperatura')
        .on('value', (snapshot) => {
            const status = (snapshot.val());
            this.setState({status});
        })
    }
     render() {
        return (
            <View>
                <Text>{this.state.status}</Text>
            </View>
         )
     }
 }
*/
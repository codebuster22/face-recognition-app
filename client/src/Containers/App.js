import React, {Component} from 'react';
import './CSS/App.css';
import NavBar from "./Navigation";
import CoverPage from "./CoverPage";
import Result from "../Components/Result";
import Particles from 'react-particles-js';
import obj from './obj'
import Clarifai from 'clarifai';
import SignIn from "./SignIn";
import Register from "./Register";
import Scroll from "../Components/Scroll"

const para = obj;

const app = new Clarifai.App({
    apiKey: 'b69053f7e78748e1b7776b6b04f8eb14'
});

const initialState = {
    input: '',
    isPending: true,
    facePosition: [],
    isSignedIn: false,
    route: 'signin',
    users: {
        userid: "",
        name: "",
        email: "",
        nonce: 0,
        datejoined: "",
    }
};

class App extends Component{
    constructor() {
        super();
        this.state= initialState;
    }
    onInputChange = (event) => {
        this.setState({facePosition: []});
        console.log(event.target.value);
        this.setState({isPending: true});
        this.setState({input: event.target.value})
    };

    loadUsers = ({userid, name, email, nonce, datejoined}) => {
        this.setState({
            users: { userid, name, email, nonce, datejoined }
        });
    };


    calculateFacePosition = ({top_row, left_col,bottom_row, right_col}) => {
        const img = document.getElementById("imageToDetectFace");
        const width = Number(img.width);
        const height = Number(img.height);
        return (
            {
                top: height*top_row,
                left: width*left_col,
                bottom: (height - (height*bottom_row)),
                right: (width - (width*right_col)),
            }
        )
    };

    addCoordinatesToState = (data) => {
        const imagePosition = data.outputs[0].data.regions.map(region=>region.region_info.bounding_box).map(coordinate=>this.calculateFacePosition(coordinate));
        console.log((imagePosition));
        this.setState({facePosition: imagePosition});
        console.log(this.state.facePosition)
    };

    updateProfileOnFaceDetect = async () => {
        const response = await fetch("http://localhost:3000/image",{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.users.userid,
            })
        });
        const data = response.json();
        return data.then(data=>data.nonce);
    };

    onSubmit = () => {
        console.log('click');
        console.log(this.state);
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response=>{
                if(response){
                    this.updateProfileOnFaceDetect().then(data=>this.setState( Object.assign(this.state.users, {nonce: data})));
                }
                this.addCoordinatesToState(response)})
            .catch(err=>console.log(err));
        this.setState({isPending: false});
    };

    onChangeRoute = (route) => {
        if(route==="signin"){
            this.setState(initialState)
        }else{
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    };

  render(){
    return (
        <div className="App ">
            <Particles params={para} className={"particlesBg "}/>
            <NavBar onChangeRoute={this.onChangeRoute} isSignedIn={this.state.isSignedIn}/>
            {(this.state.route==='home')?
                (<div className={" size"}>
                        <CoverPage className={""} onInputChange={this.onInputChange} onSubmit={this.onSubmit} name={this.state.users.name} nonce={this.state.users.nonce}/>
                        <Result  className={""} facePosition={this.state.facePosition} url={this.state.input}/>
                </div>):((this.state.route==='signin')?
            <SignIn loadUsers={this.loadUsers} className={"margin-top"} onChangeRoute={this.onChangeRoute}/>:
                    <Register loadUsers={this.loadUsers} className={"margin-top"} onChangeRoute={this.onChangeRoute}/>
                    )
            }
        </div>
    );
  }
}

export default App;

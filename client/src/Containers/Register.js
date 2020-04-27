import React, {Component} from "react";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
        }
    }

    handleInputChange = ({target}) =>{
        const value = target.type==="checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    };

    onSubmit = () => {
        console.log(this.state);
        const registerInstance = async () =>{
            const response = await fetch("http://localhost:3000/register",{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            const data = await response.json();
            if(data.Status === "User Added"){
                this.props.loadUsers(data.user);
                this.props.onChangeRoute("home");
            }else {
                alert("User Already Exist");
            }
            return data;
        };
        registerInstance();
    };

    render() {
        const {handleInputChange, onSubmit} = this;
        return (
            <article
                className="br-pill-ns ba dark-gray bg-white b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 grow">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className=" ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="br-pill pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                       type="text" name="name" id="name" onChange={handleInputChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Email</label>
                                <input className="br-pill pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                       type="email" name="email" id="email-address" onChange={handleInputChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="br-pill pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                       type="password" name="password" id="password" onChange={handleInputChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="br-pill b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" onClick={onSubmit} value="Register Now"/>
                        </div>
                        <div>
                            <p className={"f6 mt3 underline grow pointer "}
                               onClick={() => this.props.onChangeRoute("signin")}>Already a user?</p>
                        </div>
                    </div>
                </main>

            </article>
        )
    }
}

export default Register;
import React, {Component} from "react";

class SignIn extends Component  {

    constructor(props) {
        super(props);
        this.state = {
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
        const registerInstance = async () =>{
            const response = await fetch("http://localhost:3000/signin",{
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });
            const data = await response.json();
            if(data.Status === "User Found"){
                this.props.loadUsers(data.user);
                this.props.onChangeRoute("home");
            }else {
                alert("Invalid credentials");
            }
            return data;
        };
        registerInstance();
    };


    render () {
        const {handleInputChange, onSubmit} = this;
        return (
            <article className="br-pill-ns ba dark-gray bg-white b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 grow">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="signin" className=" ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="br-pill pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                       type="email" name="email" id="email" onChange={handleInputChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="br-pill b pa2 input-reset ba bg-transparent hover-bg-black w-100"
                                       type="password" name="password" id="password" onChange={handleInputChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="br-pill b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" value="Sign in" onClick={onSubmit}/>
                        </div>
                        <div>
                            <p className={"f6 mt3 underline grow pointer "} onClick={() => this.props.onChangeRoute("register")} >Register Now</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;
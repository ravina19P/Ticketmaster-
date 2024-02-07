import React, { useState } from 'react';
import { logInEmployee } from '../Service/Service';

const LogIn = () => {
    const [info, setInfo] = useState({ emailId: '', password: '' })
    const [error, setError] = useState([]);
    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }
    const submitHandle = async (event) => {
        const { emailId, password } = info;
        event.preventDefault();
        let ErrorArray = [];
        for (let x in info) {
            if (info[x] === "") {
                ErrorArray.push(x)
            }
        }
        setError(ErrorArray);
        if (ErrorArray.length <= 0) {
            let reqBody = {
                "emailId": emailId,
                "password": password
            }
            logInEmployee(reqBody).then((responce) => {
                if (responce.data !== null && responce.result) {
                    alert("Login Success")
                    window.location.href = '/dashboard';
                    localStorage.setItem("userinfo", JSON.stringify(responce.data))
                }
            })
        }
    }
    const HandleError = (value) => {
        return error.indexOf(value) > -1 ? true : false;
    }
    return (
        <div style={{ backgroundColor: 'lightblue', minHeight: '100vh' }}>
            <div className='container d-flex align-items-center justify-content-center' style={{ minHeight: '90vh' }}>
                <div className='row col-md-5 border p-4 bg-dark  text-white border-black'>
                    <form className='mt-3' onSubmit={(e) => submitHandle(e)}>
                        <h3>Log-In</h3>
                        <div className="form-group">
                            <label>Email-Id</label>
                            <input type="text" value={info.emailId} onChange={(e) => OnchangeHandle(e, 'emailId')} className={HandleError("emailId") ? "form-control is-invalid mt-2" : "form-control mt-2"} id="exampleemailId" placeholder="Enter email-Id" autoComplete="username" />
                            {HandleError("emailId") && <div class="invalid-feedback">
                                Please choose a emailId.
                            </div>}
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" value={info.password} onChange={(e) => OnchangeHandle(e, 'password')} className={HandleError("password") ? "form-control is-invalid mt-2" : "form-control mt-2"} id="exampleInputPassword1" placeholder="Password" autoComplete="current-password" />
                            {HandleError("password") && <div class="invalid-feedback">
                                Please choose a password.
                            </div>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
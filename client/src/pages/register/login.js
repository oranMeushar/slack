import React, {useState} from 'react';
import {LoginContainer, Form, LogoContainer, LogoText, FormTitle, Input, Label, Button, FormFooter} from './register.style';

import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import { useNavigate   } from 'react-router-dom';
import LoadingSpinner from '../../components/loader/loader';
import { setLogin } from '../../store/user';

const Login = ({setIsMember}) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate ();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const body = {
            email,
            password,
        }
        setIsLoading(true);

        const result = await fetch(`http://localhost:8080/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await result.json();
        setIsLoading(false);
        if(data.status === 'Success') handleSuccess(data)
        else handleError(data)
    }

    const handleSuccess = (data) =>{
        const {email, name, _id} = data.user;
        const {token} = data;
        localStorage.setItem('user',JSON.stringify({email,name, _id, token}))
        dispatch(setLogin({email, name, token}));
        navigate('/');
    }

    const handleError = (data) =>{
        const {message} = data
        toast.error( message)
        setIsLoading(false);
    }

    return (
        <LoginContainer>
            {isLoading && <LoadingSpinner topPosition={'10vmin'}/>}
            <Form onSubmit={handleSubmit}>
            <FormTitle>Login</FormTitle>
            <Label htmlFor='email'>
                <p>Email</p>
                <Input id = 'email' type='email' value={email} onChange={(e) =>setEmail(e.target.value)} placeholder='1@2.com' required/>
            </Label>
            <Label htmlFor='password'>
                <p>Password</p>
                <Input id = 'password' type='password' value={password} onChange={(e) =>setPassword(e.target.value)}required/>
            </Label>
            <Button onClick={handleSubmit}>Submit</Button>
            <FormFooter>
                Not a member yet ? <span onClick={() =>setIsMember(false)}>Register</span>
            </FormFooter>
            </Form>
        </LoginContainer>
    );
};

export default Login;
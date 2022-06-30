import { Box, Chip, Divider, Grid, InputBase, Input, Paper, styled, Typography, FormControl, OutlinedInput, Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Facebook } from '@mui/icons-material'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from  "../../App";
import M from 'materialize-css'
export default function Login() {

    const {state,dispatch} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setredirect] = useState(false)
    const [loginStatus, setloginStatus] = useState(false)

    const history = useNavigate()

    console.log("Email, password", email, password)
    const onLogin = async () => {
        console.log(email, password);
        let item = { email, password }
        console.log("Password",password);
        try {
            let result = await fetch("http://localhost:6001/user/login",{
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                    // "Accept": "application/json"
                }
                
            })
            
            .then(res => res.json())
                .then(data => {
                    console.log("This is my data", data);
                    if (data.error) {
                        console.log("Not logged in");
                    }
                    else {
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                        dispatch({type:"USER",payload:data.user});
                        M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
                        history("/");
                    }
                })
        } catch (error) {
            console.log(email,password);
            console.log(error);
        }
    }
    const PaperStyle = styled(Paper)({
        width: '50%',
        height: 'auto',
        padding: '20px',
    })
    const SendButton = styled(Button)({
        paddingBottom: '4px',
        paddingTop: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
    })
    const Typo = styled(Typography)({
        color: 'rgba(var(--f52,142,142,142),1)'
    })
    return (
        <Box margin={'auto'} margintop={'20%'} marginLeft={'25%'} width={'42%'} textAlign={'center'} >
            <div width={'25px'} >
                <Grid item xs={5} margintop={'25%'}>
                    <Typography fontSize={25}>𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</Typography>
                    <Box marginTop={'20%'}>
                        <TextField placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 5 }} />
                        <br></br>
                        <TextField placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <br></br><br></br>
                        <Box marginBottom={2} margintop={4}><button onClick={onLogin} variant="contained" margintop={4} >Login</button></Box>
                    </Box>
                </Grid>
            </div>
            <Typo>For new user</Typo>
            <Link to="/signup"> Signup</Link>
        </Box>
    )
}

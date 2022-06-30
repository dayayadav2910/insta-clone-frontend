import { Box, Chip, Divider, Grid, InputBase, Paper, styled, Typography, FormControl, OutlinedInput, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


export default function Signup({ user }) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [username, setusername] = useState('')
    const [fullname, setfullname] = useState('')

    const history = useNavigate();
    const PaperStyle = styled(Paper)({
        width: '50%',
        height: 'auto',
        padding: '20px',
    })
    const Item = styled(InputBase)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        height: 60,
        lineHeight: '60px',
    }));
    const SendButton = styled(Button)({
        paddingBottom: '4px',
        paddingTop: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
    })
    const InputOutlined = styled(OutlinedInput)({
        marginBottom: 5,
        backgroundColor: 'rgba(var(--b3f,250,250,250)',
        height: '35px',
        fontSize: 20,
    })
    const Typo = styled(Typography)({
        color: 'rgba(var(--f52,142,142,142),1)'
    })
    const onSignup = async () => {
        console.log(email, password,username,fullname)
        const item = { email, password, username, fullname }
        console.log("item",item);
        console.log(JSON.stringify(item));
        try {
            let result = await fetch("http://localhost:6001/user/signup", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(item)
            })
            // console.log("User is not created")
            // .then(res => res.json())
            // .then(data => {
            //         if (data.error) {
            //             console.log("User is not created");
            //         }
            //         else {
            //             console.log("User is created successfully");
            //             history('/login')
            //         }
            //     })
            // result = result.json();
            console.log("Login Result", result);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Box margin={'auto'} margintop={'10px'} marginLeft={'40%'} width={'auto'} textAlign={'center'} marginRight={'40%'}>
            <Grid item xs={10} marginTop={'35%'} >
                <Typography fontSize={25}>𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</Typography>
                <Typo >Sign up to see photos and videos from your friends.</Typo>
                <Divider margintop={2}>
                    <Chip label="OR"></Chip>
                </Divider>
                <Box component="form" autoComplete="off">
                    <FormControl sx={{ width: '100% ', margintop: 2 }}>
                        <TextField placeholder="Mobile Number or Email " onChange={(e) => setemail(e.target.value)} />
                    </FormControl>
                    <br></br><br></br>
                    <FormControl sx={{ width: '100%' }}>
                        <TextField placeholder="Full Name" onChange={(e) => setfullname(e.target.value)} />
                    </FormControl>
                    <br></br><br></br>
                    <FormControl sx={{ width: '100%' }}>
                        <TextField placeholder="Username" onChange={(e) => setusername(e.target.value)} />
                    </FormControl>
                    <br></br><br></br>
                    <FormControl sx={{ width: '100%' }}>
                        <TextField placeholder="Password" type='password' onChange={(e) => setpassword(e.target.value)} />
                    </FormControl>      
                    <Button variant="contained" style={{marginTop:"20px"}} onClick={onSignup}>Sign Up</Button>
                </Box>
            </Grid>
            {/* </PaperStyle> */}
            {/* <PaperStyle elevation={0} variant='outlined' square width={'25px'} sx={{ margintop: 2, padding: 2 }}>
                <Typo >Have an account? <a href=''>Log in</a> </Typo>
            </PaperStyle> */}
        </Box>
    )
}

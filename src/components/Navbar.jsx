import { Home, StickyNote2Sharp, PermIdentitySharp, FavoriteBorder } from '@mui/icons-material'
import Logout from '@mui/icons-material/Logout';
import { AppBar, Avatar, styled, Typography, Menu, MenuItem, ListItemIcon, Box, Button } from '@mui/material'
import React, { useState, useEffect,useContext } from 'react'
// import SearchBar from './SearchBar';
import { useNavigate,Link } from "react-router-dom";
import { UserContext } from '../App';

export default function Navbar() {
    const [open, setopen] = useState(false)
    const history = useNavigate();

    const BoxStled = styled(Box)({
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        maxWidth: 'calc(935px + 40px)',
        padding: '0 20px',
        transition: 'height var(--desktop-nav-anim-duration) ease-in-out',
        zIndex: '10',
        display: 'flex',
        alignContent: 'center',
        height: '100%'

    })
    const AvatarBar = styled(Avatar)({
        backgroundColor: '#f09433',
    })
    const IconsBar = styled(Box)({
        alignContent: 'center',
        alignItems: 'center',
        display: 'flex',
        // flex: '1 0 0%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        flex: '1 0 127px',
        position: 'relative',
        width: '100%'
    })
    const ListItems = styled(Box)({
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: '24px',
        whiteSpace: 'nowrap',
        width: '100%',
        justifyContent: 'space-evenly',
    })

    const AppBarStyles = styled(AppBar)({
        alignItems: 'center',
        // alignContent : 'center',
        backgroundColor: '#ffffff',
        borderBottom: ' 1px solid rgb(var(--ig-elevated-separator))',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        height: '70px',
        position: 'fixed',
        top: 0,
        transition: 'height var(--desktop-nav-anim-duration) ease-in-out',
        width: '100%',
        Zindex: '3',
    })


    const {state,dispatch} = useContext(UserContext)
    const Logout= () =>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        console.log("Button is clicked");
        history("/login")
    }
    const userRenderList = ()=>{
        if(state){
            return [
                <Link key={"1"} to='/profile' style={{textDecoration:"none", color:"black"}}>Profile</Link>,
                <a onClick={()=>{Logout()}} style={{color:"black"}}>Logout</a>,
                <h4 style={{color:'red'}}>{state.name} </h4>
            ]
        }
        else{
           return[
                <Link to='/login' style={{textDecoration:"none", color:"black"}}>Login</Link>,
                <Link to='/signup' style={{textDecoration:"none", color:"black"}}>Register</Link>               
           ]
        }
    }
    return (
        <AppBarStyles elevation={0} position='sticky' sx={{ borderBottom: '1px solid #dbdbdb', width: '100%' }}>
            <BoxStled>
                <a href={state?"/":'/login'}> <Typography variant='h5' sx={{ display: { xs: 'none', sm: 'block', color: 'black', flex: '1 0 127px' } }}>
                    𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶
                </Typography></a>
                {/* <SearchBar></SearchBar> */}
                <IconsBar>
                    <ListItems style={{alignItems:"center"}}>    
                       {userRenderList()} 
                       
                    </ListItems>
                </IconsBar>
            </BoxStled>
    </AppBarStyles >
  )

}
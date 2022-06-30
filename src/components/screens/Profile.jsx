import { Box, Button, Divider, styled } from '@mui/material'
import React,{useState,useEffect} from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useContext } from 'react';
import { UserContext } from '../../App';
export default function Profile() {

    const [mypic, setmypic] = useState([])
    const {state,distpach} = useContext(UserContext)
    console.log("name from state",state);
    useEffect(() => {
        fetch("http://localhost:6001/post/mypost",{
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        }).then(res=>res.json())
        .then(result=>{
            setmypic(result.mypost)
        })
    }, [])
    
    const BoxMain = styled(Box)({
        flexGrow: 1,
        order: 4,
        backgroundColor: '#f7f7f7',
        marginTop: '70px',
    })
    const BoxCard = styled(Box)({
        boxSizing: 'content-box',
        padding: ' 60px 20px 0',
        width: 'calc(100% - 40px)',
        flexGrow: '1',
        margin: '0 auto 30px',
        maxWidth: '935px',
        width: '100%',
    })
    const BoxHeader = styled(Box)({
        marginBottom: '44px',
        display : 'flex',
        flexDirection : 'row'
   })
    const BoxImage = styled(Box)({
        flexBasis: 0,
        flexGrow: 1,
        marginRight: '30px',
        flexShrink: 0,
    })
    const ImageBox = styled(Box)({
        backgroundColor: 'rgb(var(--ig-secondary-background))',
        borderRadius: '50%',
        boxSizing: 'border-box',
        height: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
    })
    const ImageButton = styled(Button)({
        border: 0,
        cursor: 'pointer',
        height: '100%',
        padding: 0,
        width: '100%',
    })
    return (
        <BoxMain>
            <BoxCard>
                <BoxHeader>
                    <BoxImage>
                        <Box sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', height: 'calc(148px + 2px)', width: '150px' }}>
                            <ImageBox>
                                <ImageButton>
                                    <img src="https://cdn.pixabay.com/photo/2014/07/31/22/50/photographer-407068_1280.jpg" alt="image is not avi" />
                                </ImageButton>
                            </ImageBox>
                        </Box>
                    </BoxImage>
                    <Box sx={{ flexBasis: '30px', flexGrow: 2, color: 'rgb(var(--ig-primary-text))', flexShrink: 1, minWidth: 0 }}>
                        <Box sx={{marginBottom: '20px', alignItems: 'center', flexDirection: 'row', flexShrink: 1, minWidth: 0 }}>
                            <h2>{state? state.name:"loading"}</h2>
                        </Box>
                    </Box>
                    <div>
                    <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    </Box>
                    </div>
                </BoxHeader>
            </BoxCard>
           <Divider></Divider>
            <ImageList sx={{ width: 500, height: 450 }} style={{marginLeft:'40%'}} cols={3} rowHeight={164}>
             {mypic.map((item,index) => (
        <ImageListItem key={index} >
          <img
            src={`${item.photo}?w=180&h=180&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
        </BoxMain>
    )
}

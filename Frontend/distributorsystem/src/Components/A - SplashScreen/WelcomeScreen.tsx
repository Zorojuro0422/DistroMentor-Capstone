import { Button, Grid, Icon, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Splash from '../../Global Components/Images/Splash.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from "axios";
import { IDistributor } from "../../RestCalls/Interfaces";
import { useEffect, useState } from "react";

const Logo=styled(Typography)({
    margin:'5% 10% 0 5% ',
    display: 'flex',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 'bold',
    fontSize: '25px',
    color: '#203949',
    justifyContent: 'space-between',
})
const ImageStyles = styled(Typography)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    //  marginRight:'50px',
    //  marginTop:'-30px'
    top: -350,
    left: 835,
})
const ImageStyles2 = styled(Typography)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    //  marginRight:'50px',
    //  marginTop:'-30px'
    top: 70,
    left: 100,
})
const SplashGrid = styled(Grid)({
    position: "relative",
    left: -520,
    top: -120
})
const HeaderTypo = styled(Typography)({
    position: "relative",
    //top: 5,
    left: 55,
    width: "200px",
    fontWeight: "bold",
    fontFamily: "Inter, sans-serif",
    color: "#ffffff",
    fontSize: 95
})
const SubHeaderTypo = styled(Typography)({
    position: "relative",
    //top: 195,
    left: 220,
    textAlign: 'left',
    width: "500px",
    fontFamily: "Inter, sans-serif",
    color: "#ffffff",
    fontSize: 24
})
const SignUpButton = styled(Button)({
    position: "relative",
    top: 35,
    left: 190,
    borderRadius: 50,
    height: 70,
    width: "450px",
    backgroundColor: "#ffffff",
    fontWeight: 480,
    fontSize: 25,
    color: "#0A1C34",
    ':hover': {
        backgroundColor: '#ffffff',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})
const SignInButton = styled(Button)({
    width: 200,
    height: 0,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'Inter, sans-serif',
    fontSize: '20px',
    top:10,
    left: 60,
    position: 'relative',
    display: 'flex',
    justifyContent:'center' ,
    textDecorationLine: 'underline',
    ':hover': {
        backgroundColor: 'rgba(45, 133, 231, 0)',
        transform: 'scale(1.1)'
    },
    transition: 'all 0.4s'
})

const ContentFieldGrid = styled(Grid)({
    position: 'relative',
    display: "flex",
    justifyContent: "center",

})
export default function WelcomeScreen(){
   const navigate=useNavigate();
  
   const signUpHandler=()=>{
    navigate(`/SignUpScreen`)
   }
   const signInHandler=()=>{
    navigate(`/SignIn`)
   }
   

   const [distributorsss, setDistributorsss] = useState<IDistributor[]>([]);
    function getAllDistributors() {
        axios.get<IDistributor[]>('https://distrilinkserver.azurewebsites.net/distributor/getAllDistributors')
            .then((response) => {
                setDistributorsss(response.data);

            })
            .catch((error) => {

                // alert("Error retrieving payment receipts. Please try again.");
            });
    } 
    

    useEffect(() => {
      

        getAllDistributors();
        console.log(distributorsss);
    }, []);
   
    return(
        <div style={{ background: 'linear-gradient(#004AAD,#5DE0E6  )', width: '100vw', height: '100vh', position: 'fixed', }}>
            {/* <Button variant="contained" onClick={signUpHandler}>Sign up</Button>
            <Button variant="contained" onClick={signInHandler}>Sign in</Button> */}
            {/** Logo*/}
            <Logo>
                <div style={{ height: '150px', width: '270px', marginTop: '-5%' }}></div>  {/* Placeholder */}
                {/** Sign-In*/}
                <SignInButton onClick={signInHandler}>Sign In</SignInButton>
            </Logo>
            <SplashGrid item container>
                <ContentFieldGrid container spacing={8}>
                    <Grid item>
                        <ImageStyles2>
                            <div style={{ height: '150px', width: '270px', marginTop: '-5%' }}></div>  {/* Placeholder */}
                        </ImageStyles2>
                    </Grid>
                </ContentFieldGrid>
                <ContentFieldGrid container spacing={8}>
                    <Grid item>
                        <HeaderTypo>Welcome</HeaderTypo>
                    </Grid>
                </ContentFieldGrid>
                <ContentFieldGrid container spacing={8}>
                    <Grid item>
                        <SubHeaderTypo>Streamline Credit Handling</SubHeaderTypo>
                        <SubHeaderTypo>for Distributors and Dealers with Ease.</SubHeaderTypo>
                    </Grid>
                </ContentFieldGrid>
                <ContentFieldGrid container spacing={8}>
                    <Grid item>
                        <SignUpButton variant="contained" onClick={signUpHandler}>
                            Get Started
                            <Icon style={{ color: '#0A1C34', display: 'flex', height: 25, width: 'auto', top: 5, marginLeft: '20x', fontWeight: 'bold' }}>
                                <input hidden accept="image/*" type="file" />
                                <ArrowForwardIosIcon />
                            </Icon>
                        </SignUpButton>

                    </Grid>
                </ContentFieldGrid>

                <ContentFieldGrid container>
                    <Grid item>
                        <ImageStyles>
                            <img src={Splash} style={{ width: 'auto', height: '450px' }}></img>
                        </ImageStyles>
                    </Grid>
                </ContentFieldGrid>
            </SplashGrid>
        </div>
    );
}
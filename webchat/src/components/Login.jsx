import { Box, Button, Container, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { Context } from '..'
import firebase from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import 'firebase/auth';

const Login = () => {

	const {auth} = useContext(Context)

	const login = async () => {
		const provider = new GoogleAuthProvider()
		const {user} = await signInWithPopup(auth, provider)
		console.log(user)
	}

  return (
    <Container>
			<Grid container
				alignItems="center"
				justifyContent={"center"}
			>
				<Grid style={{width:400, background: 'lightgrey'}}
					container
					alignItems={"center"}
					direction={"column"}
				>
					<Box p={5}>
						<Button onClick={login} variant={"outlined"}>Вход с помощью Google</Button>
					</Box>
				</Grid>
			</Grid>
    </Container>
  )
}

export default Login
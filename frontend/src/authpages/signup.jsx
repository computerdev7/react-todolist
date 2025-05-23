import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Func() {

    const toast = useToast();

    let [signupInfo, setSignupInfo] = useState({
        username: '',
        name: '',
        password: '',
        confirmPassword: ''
    })

    let [userInp, setUserInput] = useState(false)

    let navigate = useNavigate();

    function signuping() {

        const isValid = /[!@#$%^&*]/.test(signupInfo.username)

        let compPass = signupInfo.password === signupInfo.confirmPassword

        if (signupInfo.username.length < 8 || !isValid || signupInfo.password.length < 8 || !compPass) {

            return toast({
                title:"Please enter valid username and password",
                status:'error',
                duration:3000,
                isClosable:true,
                position:'bottom'
            })

        }

        try {
            axios.post('http://localhost:3000/auth/api/signup', signupInfo)
                .then(res => {
                    if(res.data.success){
                        toast({
                            title:"Successfully signed-up",
                            status:"success",
                            duration:3000,
                            isClosable:true,
                            position:'bottom'
                        })
                    }
                })
            navigate('/login')
        } catch (err) {
            console.log(err, 'here in siginiup')
        }
    }

    return (
        <>
            <Box
                w={'100%'}
                h={'100%'}
                justifyItems={'center'}
                alignContent={'center'}
                bgGradient='linear(to-l, #0d1b2a, #415a77)'
                color={'white'}
            >

                <Flex
                    alignItems={'center'}
                    flexDir={'column'}
                    w={{ lg: '500px', md: '400px', base: '300px' }}
                    h={{ lg: '550px', md: '550px', base: '520px' }}
                    bgColor={'#1B263B'}
                    gap={5}
                    borderRadius={10}
                    p={5}
                    boxShadow='2xl'
                    outline={'0.5px solid #1d3557'}
                >

                    <Text textAlign={'center'}
                        fontWeight={'bold'}
                        fontSize={{ base: '20px' }}>
                        SIGNUP PAGE
                    </Text>

                    <FormControl>
                        <FormLabel
                            fontSize={{ lg: '13.5px', md: '12px', base: '10px' }}
                            opacity='0.5'
                        >USERNAME</FormLabel>

                        <Input type='text' name="username"
                            placeholder="akash@345"
                            _placeholder={{ color: 'black' }}
                            bg="white"
                            value={signupInfo.username}
                            color={'black'}
                            onChange={(e) => {
                                setSignupInfo(info => ({ ...info, username: e.target.value }))
                                setUserInput(true)
                            }} />
                        <FormHelperText color={'white'}>
                            {userInp ? "username should consist of 8 char or number with unique char" : (
                                <Text color={'red.800'}>Enter Username</Text>
                            )}
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel
                            opacity='0.5'
                            fontSize={{ lg: '13.5px', md: '12px', base: '10px' }}
                        >NAME</FormLabel>
                        <Input type='text' name="name"
                            _placeholder={{ color: 'black' }}
                            color={'black'}
                            placeholder="akash"
                            bg="white"
                            value={signupInfo.name}
                            onChange={(e) => setSignupInfo(info => ({ ...info, name: e.target.value }))} />
                    </FormControl>

                    <FormControl>
                        <FormLabel
                            opacity='0.5'
                            fontSize={{ lg: '13.5px', md: '12px', base: '10px' }}
                        >PASSWORD</FormLabel>
                        <Input type='password' name="password"
                            value={signupInfo.password}
                            color={'black'}
                            bg="white"
                            onChange={(e) => setSignupInfo(info => ({ ...info, password: e.target.value }))} />
                        <FormHelperText color={'white'}
                            fontSize={{ lg: '13.5px', md: '12px', base: '11.9px' }}>
                            password should consist of 8 char or number
                        </FormHelperText>
                    </FormControl>

                    <FormControl>
                        <FormLabel
                            opacity='0.5'
                            fontSize={{ lg: '13.5px', md: '12px', base: '10px' }}
                        >CONFIRM-PASSWORD</FormLabel>
                        <Input type='password' name="confirmpassword"
                            bg="white"
                            color={'black'}
                            value={signupInfo.confirmPassword}
                            onChange={(e) => setSignupInfo(info => ({ ...info, confirmPassword: e.target.value }))} />
                    </FormControl>

                    <Button onClick={signuping} colorScheme={'blue'}>SUBMIT</Button>
                </Flex>
            </Box>
        </>
    )
}

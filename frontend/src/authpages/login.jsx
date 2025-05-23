import { Box, Button, Flex, FormControl,  FormLabel, Input, Text,useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Func() {

// this line prevents going forward if on login without right detail
    localStorage.removeItem("token")

    const toast = useToast()
    
    let [loginDetail, setLoginDetail] = useState({
        username: "",
        password: ""
    })

    let navigate = useNavigate();

    async function loginIn() {
        
        if(loginDetail.username.length < 8 || loginDetail.password.length < 8){
            return  toast({
                title:"Please enter valid username and passsword",
                status:"error",
                isClosable:true,
                position:"bottom",
                duration:3000
            })

        } else{

            try {
                let response = await axios.post('http://localhost:3000/auth/api/login', loginDetail)
                    
                localStorage.setItem("token", response.data.token)
                    
               if(response.data.success){
                toast({
                    title:"Successful login",
                    description:"create notes howevr you like",
                    status:"success",
                    isClosable:true,
                    position:"bottom",
                    duration:3000
                })
                navigate('/');
                } else {
                    toast({
                        title:"Something went wrong",
                        status:"error",
                        isClosable:true,
                        position:"bottom",
                        duration:3000
                    })
                }
            } catch (err) {
                console.log('err in loginin', err)
            }
        }

    }

    return (
        <Box
            h='100%'
            w='100%'
            alignContent={'center'}
            justifyItems={'center'}
            bgGradient='linear(to-l, #0d1b2a, #415a77)'
            color={'white'}
        >
            <Flex
                flexDir={'column'}
                alignItems={'center'}
                gap={8}
                bgColor={'#1B263B'}
                w={{ lg: '500px', md: '400px', base: '300px' }}
                h={{ lg: '360px', md: '360px', base: '360px' }}
                p={5}
                boxShadow='2xl'
                outline={'0.5px solid #1d3557'}
                borderRadius={10}
            >
                <Text
                    fontWeight={'bold'}
                >LOGIN PAGE</Text>
                <FormControl>
                    <FormLabel opacity={'0.5'}
                    fontSize={{ lg: '13.5px', md: '12px', base: '10px' }}
                    >USERNAME</FormLabel>
                    <Input type="text"
                    color={'black'}
                        placeholder="akash@234"
                        _placeholder={{ color: 'black' }}
                            bg="white"
                        value={loginDetail.username}
                        onChange={(e) => setLoginDetail(el => ({ ...el, username: e.target.value }))} />
                </FormControl>
               
                <FormControl>
                <FormLabel opacity={'0.5'}
                fontSize={{ lg: '13.5px', md: '12px', base: '10px' }}
                >PASSWORD</FormLabel>
                <Input type="password"
                    value={loginDetail.password}
                    bg="white"
                    color={'black'}
                    onChange={(e) => setLoginDetail(el => ({ ...el, password: e.target.value }))} />
                    </FormControl>
                    <Button onClick={loginIn} colorScheme={'blue'}>SUBMIT</Button>
            </Flex>
        </Box>
    )
}
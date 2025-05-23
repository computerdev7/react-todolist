import { Box, Button, Input, VStack, HStack, Center, Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import ShowLabels from "./sidebarlabels.jsx"
import { useStore } from "../store.jsx";
import { useNavigate } from "react-router-dom";

export default function func() {

    const navigate = useNavigate();
    
    const toast = useToast();

    function logout() {
        localStorage.removeItem("token")
        toast({
            title: "Logout successfull",
            duration: 3000,
            status: 'warning',
            isClosable: 'true',
            position: 'bottom'
        })
        if(!localStorage.getItem("token")){
            navigate('/login')
        }
    }

    let { labelData, setLabelData, showLabelData, showlabel } = useStore();

    let token = localStorage.getItem('token')

    async function addLabel() {
        if (labelData.length < 4) {
            return toast({
                title: "Please have atlest 4 charachter",
                duration: 3000,
                status: 'error',
                isClosable: 'true',
                position: 'bottom'
            })
        } else {
            try {
                axios.post('http://localhost:3000/label/send', { labdata: labelData }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if (res.data.success) {
                            toast({
                                title: "Label added",
                                duration: 3000,
                                status: 'success',
                                isClosable: 'true',
                                position: 'bottom'
                            })
                            showlabel()
                        } else {
                            toast({
                                title: "something went wrong",
                                duration: 3000,
                                status: 'error',
                                isClosable: 'true',
                                position: 'bottom'
                            })
                        }
                    })
            } catch (err) {
                console.log('error in sending data to backend')
            }
        }

    }

    useEffect(() => {
        showlabel()
    }, [])

    return (
        <>
            <Box
                h={'100vh'}
                w={{ base: '35%', md: "20%" }}
                bgColor={'#262625'}
                position={'fixed'}
                right={0}
                top={0}
                overflowY="auto"
                color={'white'}
                p={3}
            >
                <VStack>
                    <Input
                        value={labelData}
                        onChange={(e) => setLabelData(e.target.value)}
                    />
                    <Button onClick={() => {
                        addLabel();
                        setLabelData('')
                    }}
                        size={{ base: "sm", md: "md", lg: "lg" }}>NEW LABEL</Button>
                    <VStack
                        mt={10}
                        spacing={4}
                        mb={10}
                        h={'60vh'}
                        overflow={"auto"}
                    >
                        <ShowLabels state={showLabelData} func={showlabel} />
                    </VStack>
                </VStack>
                <Flex
                    h={'80px'}
                    w={'100%'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    zIndex={1}
                    bgColor={'#262625'}
                >
                    <Button onClick={logout}
                        size={{ base: "sm", md: "md", lg: "lg" }}
                        px={{ base: 4, md: 6, lg: 8 }}
                        fontSize={{ base: "12px", md: "16px", lg: "20px" }}
                    >LOGOUT</Button>
                </Flex>
            </Box>
        </>
    )
}
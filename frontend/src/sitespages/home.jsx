import { Box, Input, Button, Text, HStack, VStack, SimpleGrid, Flex,useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";
import Navbar from "../component/navbar.jsx"
import Note from "../component/note.jsx"
import Sidebar from "../component/sidebar.jsx"
import { useStore } from "../store.jsx";
import { useNavigate } from "react-router-dom";

export default function Func() {


    let navigate = useNavigate()

    if(!localStorage.getItem("token")){
        navigate('/login')
    }

    useEffect( ()=> {
        if(!localStorage.getItem("token")) navigate('/login')
    },[navigate])

    const toast = useToast();

    let [notesVal, setNotesVal] = useState('');

    let [allNotes, setAllNotes] = useState([]);

    let token = localStorage.getItem("token");

    let { sidebar, showLabelNote, labelNotesToggle} = useStore();

    async function fetchNotes() {
        try {
            let resData = await axios.get('http://localhost:3000/note/get', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setAllNotes(resData.data.message.map(note => note))
        } catch (err) {
            console.log(err, 'error in showingdata')
        }
    }


    useEffect(() => {
        if (token) {
            fetchNotes();
        }
    }, [token])


    async function addNote() {
        try {
            let sendNotes = await axios.post('http://localhost:3000/note/send', { notesVal: notesVal }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(sendNotes.data.success){
                toast({
                    title: "Note created",
                    status:"success",
                    description: "Now you can update note",
                    duration:3000,
                    isClosable:true,
                    position:'bottom'
                })
            }else{
                toast({
                    title: "Something went wrong",
                    status:"error",
                    duration:3000,
                    isClosable:true,
                    position:'bottom'
                })
            }
            fetchNotes();
            navigate(`/notes/${sendNotes.data.message._id}`)
        } catch (err) {
            console.log(err, 'error in signup')
        }
    }


    return (
        <>
            <HStack>
                <VStack
                    spacing={10}
                    bgColor={'blackAlpha.800'}
                    minH={'100vh'}
                    w={sidebar ? {base:'65%',"md":'80%'}: '100%'}
                    >
                    <Navbar />
                    <Box
                        justifyItems={'center'}
                        >
                        {/* <HStack
                            w={{ base: '200px', md: "300px","lg":'450px' }}
                            > */}
                            <Button onClick={addNote} colorScheme="whiteAlpha"
                               w={["40", "50", "60", "80"]} // Changes at different breakpoints
                               h={["10", "20", "70"]} 
                                fontSize={{ base: "20px", md: "30px", lg: "40px" }}
                                boxShadow='dark-lg'
                                ><Text
                                color={"gray.100"}
                                ><b>ADD NOTES</b></Text></Button>
                        {/* </HStack> */}
                        <SimpleGrid
                            mt={100}
                            columns={{ base: 1, sm: 1,md: 2, lg: 3 }}
                            spacing={20}
                            justifyItems={'center'}
                            alignContent={'center'}
                            >
                            <Note state={labelNotesToggle?showLabelNote:allNotes} func={fetchNotes} />
                        </SimpleGrid>
                    </Box>
                </VStack>
                            {sidebar ? <Sidebar /> : undefined}
            </HStack>
        </>
    )
}
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useBreakpointValue } from "@chakra-ui/react";
import { VStack, HStack, Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import {useEffect, useState} from "react"
import { useStore } from "../store.jsx";
import { Tooltip } from "@chakra-ui/react";

export default function Func(prop) {

    const toast = useToast();
            
    let condition = useBreakpointValue({ base: true, md: true, lg: false })

    const StackComponent = condition ? VStack : HStack;

    let [updLabel,setUpdLadel] = useState(['A']);

    useEffect(()=>{
        setUpdLadel(prop.state.map(el => el.labdata));
    },[prop.state])

    let {setShowLabelNote,  labelNotesTrue } = useStore();

let showlabels = prop.state.map((el, index) => {

        let token = localStorage.getItem('token')

        async function deleteLabel() {
            try {
                axios.delete(`http://localhost:3000/label/delete/${el._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(res => {
                        if(res.data.success){
                            toast({
                                title: "label deleted",
                                duration: 3000,
                                status:'warning',
                                isClosable: 'true',
                                position: 'bottom'
                            })
                            prop.func()
                        }else {
                            toast({
                                title: "something went wrong",
                                duration: 3000,
                                status:'error',
                                isClosable: 'true',
                                position: 'bottom'
                            })
                        }
                    })
            } catch (err) {
                console.log('error in deleteing data')
            }
        }

        async function updateLabel(){
                  try{
                      axios.put(`http://localhost:3000/label/update/${el._id}`,{value:updLabel[index]},{
                          headers:{
                              'Authorization' : `Bearer ${token}`
                          }
                      })
                      .then(res => {
                        if(res.data.success){
                            toast({
                                title: "label Updated",
                                duration: 3000,
                                status:'success',
                                isClosable: 'true',
                                position: 'bottom'
                            })
                            prop.func()
                        }else {
                            toast({
                                title: "something went wrong",
                                duration: 3000,
                                status:'error',
                                isClosable: 'true',
                                position: 'bottom'
                            })
                        }
                    })
                     }catch(err){
                          console.log('error in updating data')
                     }
        }
        // console.log()

        async function labelNotes(){
            try {
                axios.get('http://localhost:3000/note/label',{
                    params:{label:el.labdata},
                    headers:{
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then(res=> {
                    setShowLabelNote(res.data.message)
                })
            }catch(err){
                console.log('err in showing the notes using label')
            }
        }

        return (
            <Box key={index}
                w={'100%'}
                p={2}
                    onClick={()=> {
                        labelNotes();
                        labelNotesTrue()
                    }}

                >
                <StackComponent
                    justifyContent={'space-between'}
                    >
                        <Tooltip label="save updated text">
                    <Input
                    value={updLabel[index]}
                    onChange={(e)=> {
                        setUpdLadel(el=> el.map((val,i)=> i===index?e.target.value:val))
                    }}
                    fontSize={{ base: "12px", md: "18px", lg: "20px" }}
                    outline={'none'}
                    border={'none'}
                    />
                    </Tooltip>
                    <HStack>
                        <Button
                            size={{ base: "sm", md: "md", lg: "lg" }}
                            onClick={deleteLabel}><MdDeleteForever /></Button>
                            <Tooltip label="save text">
                        <Button
                            size={{ base: "sm", md: "md", lg: "lg" }}
                            onClick={()=> {
                                updateLabel()
                            }
                            }><FaEdit /></Button>
                            </Tooltip>
                    </HStack>
                </StackComponent>
            </Box>
        )
    })

    return (
        <>
            {showlabels}
        </>
    )
}
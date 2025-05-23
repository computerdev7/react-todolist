import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Box, Button, Textarea, Select, HStack, Tooltip, useToast} from "@chakra-ui/react"
import { useStore } from "../store.jsx"

export default function Func() {

    let token = localStorage.getItem("token")

    const toast = useToast();

    let navigate = useNavigate()

    let { id } = useParams()

    let [printData, setPrintData] = useState()

    let {showLabelData,showlabel} = useStore()

    let [selectLabel,setSelectLabel] = useState('none');

    async function getData() {
        try {
            let notedata = await axios.get(`http://localhost:3000/note/get/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setPrintData(notedata.data.message[0].data)

        } catch (err) {
            console.log('error in getting data inside note', err)
        }
    }

    useEffect(() => {
        if (token) getData();
        showlabel();
    }, [])


    async function updateData() {
        try {
            let updateData = await axios.put(`http://localhost:3000/note/update/${id}`, { data: printData, label: selectLabel }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(updateData.data.success){
                toast({
                    title:"Note updated",
                    duration:3000,
                    status:'success',
                    isClosable:'true',
                    position:'bottom'
                })
            }else {
                toast({
                    title:"something went wrong",
                    duration:3000,
                    status:'error',
                    isClosable:'true',
                    position:'bottom'
                })
            }
            navigate('/')
        } catch (err) {
            console.log('error in updating data', err)
        }
    }

let labelOptions = showLabelData.map((el)=> {
        return (
            <option key={el._id} value={el.labdata}>{el.labdata}</option>
        )
    })


    return (
        <>
            <Box
                minH={'100vh'}
            >


                <Textarea
                    minH="90vh"
                    value={printData}
                    bgColor={'blackAlpha.800'}
                    onChange={(e) => {
                        setPrintData(e.target.value);
                    }}
                    resize={'none'}
                    border={'none'}
                    _focus={{ boxShadow: "none" }}
                    borderRadius={0}
                    color={'#b0b0b0'}
                >
                </Textarea>
                <Box
                w={'100%'}
                h={'10vh'}
                bgColor={'blackAlpha.800'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                >
                <HStack>
                <Button onClick={updateData}
                colorScheme="whiteAlpha"
                >UPDATE</Button>
                <Tooltip label="choose label">
                <Select
                maxW={'200px'}
                color={'white'}
                value={selectLabel}
                onChange={(e)=> setSelectLabel(e.target.value)}
                sx={{
                    option:{
                        background:'grey',
                        color:'white'
                    }
                }}
                >
                    <option value={'none'}>none</option>
                    {labelOptions}
                </Select>
                </Tooltip>
                </HStack>
                </Box>
            </Box>
        </>
    )
}
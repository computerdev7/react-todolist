import { Box, VStack, HStack, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function func(prop) {

    const toast = useToast();

    let token = localStorage.getItem("token");
    let navigate = useNavigate()

    let renderNote = prop.state.map((el, index) => {

        async function deleteNote() {
            try {
                let deletenote = await axios.delete(`http://localhost:3000/note/delete/${el._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (deletenote.data.success) {
                    toast({
                        title: "Note successfully deleted",
                        duration: 3000,
                        status: 'warning',
                        isClosable: 'true',
                        position: 'bottom'
                    })
                    prop.func()
                } else {
                    toast({
                        title: "Something went wrong",
                        duration: 3000,
                        status: 'error',
                        isClosable: 'true',
                        position: 'bottom'
                    })
                }
            } catch (err) {
                console.log('err in deleting note', err)
            }
        }
        return (
            <>
                <VStack
                    h={{ base: '200px', sm: '250px', "md": '200px' }}
                    w={{ base: '200px', sm: '250px', "md": '200px' }}
                    borderRadius={10}
                    bgColor={'blackAlpha.100'}
                    shadow={'dark-lg'}
                    outline={'1px solid #5a5959 '}
                >
                    <Box
                        h={{ base: '140px', sm: '190px', "md": '140px' }}
                        w={{ base: '200px', sm: '250px', "md": '200px' }}
                        borderTopRadius={10}
                        bgColor={'blackAlpha.800'}
                        key={index}
                        color={'#b0b0b0'}
                        p={2}
                        cursor={'pointer'}
                        onClick={() => navigate(`/notes/${el._id}`)}
                    >{el.data.length > 20 ? `${el.data.slice(0, 20)}...` : el.data}
                    </Box>
                    <HStack>
                        <Button
                            colorScheme="whiteAlpha"
                            key={el._id} onClick={deleteNote}>DELETE</Button>
                    </HStack>
                </VStack>
            </>
        )
    })
    return (
        <>
            {renderNote}
        </>
    )
}
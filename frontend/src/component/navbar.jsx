import { Button, HStack, Text } from "@chakra-ui/react"
import { useStore } from "../store.jsx"
import { CiMenuBurger } from "react-icons/ci";

export default function func() {

    let { sidebarsh, labelNotesFalse, labelNotesToggle } = useStore();

    return (
        <>
            <HStack
                h={{ base: '40px', "md": '70px' }}
                w={'100%'}
                justifyContent={'space-between'}
                p={10}
                bgColor='#242323'
                outline='0.1px solid black'
                shadow={'dark-lg'}
            >
                <Text
                    fontSize={{ base: '20px', "md": "30px" }}
                    fontWeight='extrabold'
                    color={"whiteAlpha.800"}
                    onClick={labelNotesFalse}
                    cursor="pointer"
                >{labelNotesToggle?"HOME":"JUSTNOTES"}</Text>
                <HStack spacing={2}>
                    <Button onClick={sidebarsh}
                        size={{ base: "sm", md: "md", lg: "lg" }}
                        px={{ base: 4, md: 6, lg: 8 }}
                        fontSize={{ base: "12px", md: "16px", lg: "20px" }}
                    ><CiMenuBurger /></Button>
                </HStack>
            </HStack>
        </>)
}
import Signup from "./authpages/signup.jsx"
import {Box} from "@chakra-ui/react"
import {Routes,Route} from "react-router-dom"
import Login from "./authpages/login.jsx"
import Home from "./sitespages/home.jsx"
// import ProtectedRoute from "./component/protectedroute.jsx"
import Notes from "./component/notes.jsx"

export default function func(){
    return (
        <>
        <Box w={"100vw"} h={"100vh"}>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>
                {/* <Route element={<ProtectedRoute />}> */}
                <Route path="/" element={<Home />} />
                {/* </Route> */}
                <Route path="/notes/:id" element={<Notes />}/>
            </Routes>
        </Box>
        </>
    )
}
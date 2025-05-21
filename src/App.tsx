import {Box, Image} from "@chakra-ui/react";
import CardComponent from "./components/Card/card.tsx";

function App() {
    return (
        <Box height="100vh" width="100vw" overflow="hidden">
            <Image src="src/assets/image.jpg" height="100vh" position="relative"/>

            <Box width={{base: "90vw", md: "60vw", lg: "40vw"}} position="absolute" top="50%" left="50%"
                 transform="translate(-50%, -50%)">
                <CardComponent title="Looks like you're new here!"
                               subtitle="Sign up to get started!"
                               content={<div/>}
                />
            </Box>
        </Box>
    )
}

export default App

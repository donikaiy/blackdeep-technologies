import {Box, Card, Flex} from "@chakra-ui/react";
import * as React from "react";

interface CardComponentProps {
    title: string,
    subtitle?: string,
    content: React.ReactNode,
    footer?: React.ReactNode,
}

const CardComponent = ({title, subtitle, content, footer}: CardComponentProps) => {
    return (
        <Card.Root p="4" borderRadius="16px">
            <Card.Body gap="4">
                <Flex direction="column" gap="2">
                    <Card.Title fontSize="24px" textAlign="center">{title}</Card.Title>
                    {subtitle &&
                        <Card.Title fontSize="16px" textAlign="center"
                                    mb="2">{subtitle}</Card.Title>}
                </Flex>

                <Box>
                    {content}
                </Box>
            </Card.Body>

            {footer && <Card.Footer justifyContent="center">
                {footer}
            </Card.Footer>}
        </Card.Root>
    )
}

export default CardComponent

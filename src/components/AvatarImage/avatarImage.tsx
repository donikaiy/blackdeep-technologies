import {Avatar, type AvatarRootProps} from "@chakra-ui/react";

interface AvatarImageProps {
    size?: AvatarRootProps['size']
    name: string;
    src?: string
}

const AvatarImage = ({size = "md", name, src}: AvatarImageProps) => {
    return (
        <Avatar.Root size={size}>
            <Avatar.Fallback name={name}/>
            {src && <Avatar.Image src={src}/>}
        </Avatar.Root>
    )
}

export default AvatarImage;

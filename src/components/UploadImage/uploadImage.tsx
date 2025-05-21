import * as React from "react";
import { Button, FileUpload, Box } from "@chakra-ui/react";
import { LuFileImage } from "react-icons/lu";

interface UploadImageProps {
    onFileSelect: (url: string | null) => void;
}

const UploadImage = ({ onFileSelect }: UploadImageProps) => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<string[]>([]);

    React.useEffect(() => {
        previews.forEach((url) => URL.revokeObjectURL(url));

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews(newPreviews);

        onFileSelect(newPreviews[0] ?? null);

        return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
    }, [files]);

    return (
        <Box>
            <FileUpload.Root>
                <FileUpload.HiddenInput
                    accept="image/*"
                    data-testid="file-input"
                    onChange={(e) => {
                        if (!e.target.files) return;
                        setFiles(Array.from(e.target.files));
                    }}
                />
                <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <LuFileImage /> Upload file
                    </Button>
                </FileUpload.Trigger>
            </FileUpload.Root>
        </Box>
    );
};

export default UploadImage;

interface FileUploadButtonProps {
    id: string;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function FileUploadButton({ id, label = "+ Add PDF", onChange }: FileUploadButtonProps) {
    return (
        <>
            <label
                htmlFor={id} 
                className="bg-gray-500 rounded h-10 w-28 flex items-center justify-center text-white cursor-pointer"
            >
                {label}
            </label>
            <input
                id={id}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={onChange}
            />
        </>
    );
}

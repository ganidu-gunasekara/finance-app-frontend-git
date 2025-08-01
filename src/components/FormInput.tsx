interface FormInputProps {
    label: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    placeholder: string;
    name : string;
}

export default function FormInput({ label, type = "text", icon, ...props }: FormInputProps) {
    return (
        <div className="flex flex-col mb-2 relative">
            <label>{label}</label>
            <input
                type={type}
                className="border rounded-2xl min-h-12 px-2 w-full"
                {...props}
            />
            {icon && <div className="absolute right-3 top-3/4 transform -translate-y-1/2 text-gray-600">{icon}</div>}
        </div>
    );
}

interface SocialButtonProps {
    icon: React.ReactNode;
    text: String;
    onClick?: () => void;
}


export default function SocialButton({ icon, text, onClick }: SocialButtonProps) {
    return(
        <button type="button" 
        className="flex items-center justify-center gap-2 bg-white text-black min-h-10 border rounded-[10px]"
        onClick={onClick}
        >{icon} {text}
        </button>
    )
}
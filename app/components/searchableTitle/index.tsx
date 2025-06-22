import { useState } from "react"

type Props = {
    text: string
    onChange: (value: string) => void
}

export const SearchableTitle = ({ text, onChange }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const handleClick = () => {
        setIsEditing(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        onChange(e.target.value)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        <div className="flex flex-col items-center">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoFocus
                        className="text-3xl font-bold mb-2 text-center text-gray-200 rounded-lg shadow-lg bg-gray-700 bg-opacity-75 border-none px-4 py-2"
                    />
                </>
            ) : (
                <h1
                    onClick={handleClick}
                    className="text-3xl font-bold mb-6 text-center text-gray-200 cursor-pointer"
                >
                    {text}
                </h1>
            )}
        </div>
    )
}

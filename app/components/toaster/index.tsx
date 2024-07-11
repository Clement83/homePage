import React from 'react'

type TosterProps = {
    isVisible: boolean
    onClickCloseButton: () => void
    message: string
}

export const Toaster = ({ isVisible, onClickCloseButton, message }: TosterProps) => {

    if (isVisible) {
        return (
            <div id="toaster" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-h-full w-full sm:w-3/4 md:w-2/3">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold">Webhook Response</h3>
                    <button onClick={onClickCloseButton} className="text-gray-400 hover:text-gray-200 text-2xl">&times;</button>
                </div>
                <pre id="toaster-content" className="mt-2 text-xs bg-gray-900 p-2 rounded overflow-auto max-h-96">{message}</pre>
            </div>
        )
    }

    return null
}
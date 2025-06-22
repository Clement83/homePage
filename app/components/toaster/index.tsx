import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'

type TosterProps = {
    isVisible: boolean
    onClickCloseButton: () => void
    message: string
}

export const Toaster = ({ isVisible, onClickCloseButton, message }: TosterProps) => {
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => setCopied(false), 2000)
            return () => clearTimeout(timer)
        }
    }, [copied])

    const isValidJson = (str: string) => {
        try {
            JSON.parse(str)
            return true
        } catch {
            return false
        }
    }

    const handleCopy = () => {
        const content = isValidJson(message)
            ? JSON.stringify(JSON.parse(message), null, 2)
            : message

        navigator.clipboard.writeText(content)
            .then(() => setCopied(true))
            .catch(console.error)
    }

    const renderMessage = () => {
        if (isValidJson(message)) {
            const parsed = JSON.parse(message)
            return (
                <pre className="mt-2 text-xs bg-gray-900 p-2 rounded overflow-auto max-h-96">
                    {JSON.stringify(parsed, null, 2)}
                </pre>
            )
        }
        return (
            <pre className="mt-2 text-xs bg-gray-900 p-2 rounded overflow-auto max-h-96">
                {message}
            </pre>
        )
    }

    return isVisible ? (
        <div id="toaster" className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-h-full w-full sm:w-3/4 md:w-2/3">
            <div className="flex justify-between items-center gap-3 relative">
                {/* Titre */}
                <h3 className="font-bold text-sm sm:text-base">Webhook Response</h3>

                {/* Conteneur des boutons */}
                <div className="flex items-center gap-3">
                    {/* Copier */}
                    <span
                        onClick={handleCopy}
                        className="focus:outline-none p-2 transition-all duration-200 cursor-pointer"
                        title="Copier le contenu"
                    >
                        <Icon
                            icon={copied ? 'mdi:check' : 'mdi:content-copy'}
                            className={copied ? 'text-green-400' : ''}
                        />
                    </span>

                    {/* Fermer */}
                    <span
                        onClick={onClickCloseButton}
                        className="text-2xl p-2 transition-all duration-200 cursor-pointer"
                        title="Fermer"
                    >
                        <Icon icon="mdi:close" />
                    </span>
                </div>
            </div>

            {renderMessage()}
        </div>
    ) : null
}

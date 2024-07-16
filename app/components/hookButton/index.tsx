import React from 'react'

type HookButtonProps = {
    hook: any
    onClick: (e: any, id: string, name: string) => void
}

export const HookButton = ({ hook, onClick }: HookButtonProps) => {

    return (
        <div
            title={hook.name}
            className="p-2 webhook-button cursor-pointer bg-gray-700 hover:bg-gray-800 bg-opacity-60 w-12 h-12 text-white rounded-lg flex items-center justify-center mb-2 shadow-md"
            data-id={hook.id}
            onClick={(e) => onClick(e, hook.id, hook.name)}
        >
            {hook.icon ? (
                <span className="w-8 h-8" dangerouslySetInnerHTML={{ __html: hook.icon }}></span>
            ) : (
                <span>{hook.name}</span>
            )}
        </div>
    )
}
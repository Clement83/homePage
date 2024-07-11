import React from 'react'
import { HookButton } from '../hookButton'

type CardProps = {
    site: any
    triggerVisit: (url: string) => void
    triggerWebhook: (e: any, id: string, name: string) => void
}

export const Card = ({ site, triggerVisit, triggerWebhook }: CardProps) => {

    return (
        <div
            className={`card bg-white bg-opacity-80 rounded-lg shadow-md p-6 text-center ${site.url ? 'cursor-pointer' : ''} hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out`}
            onClick={() => site.url && triggerVisit(site.url)}
        >
            {site.icon && (
                <div className={`mx-auto mb-4 ${!site.webHook ? 'w-28 h-28' : 'w-16 h-16'}`}>
                    <span dangerouslySetInnerHTML={{ __html: site.icon }}></span>
                </div>
            )}
            <h2 className="text-lg font-semibold mb-2">{site.name}</h2>
            {site.webHook && (
                <div className="flex">
                    {site.webHook.map((hook) => <HookButton hook={hook} onClick={triggerWebhook} key={hook.name} />)}
                </div>
            )}
        </div>
    )
}
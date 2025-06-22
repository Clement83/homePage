import React from 'react'
import { HookButton } from '../hookButton'

type CardProps = {
    site: any
    triggerWebhook: (e: any, id: string, name: string) => void
}

export const Card = ({ site, triggerWebhook }: CardProps) => {

    return (
        <div
            className={`card bg-white bg-opacity-80 rounded-lg shadow-md p-6 text-center ${site.url ? 'cursor-pointer' : ''} hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out`}
        >
            <a href={site.url} target="_blank" className="no-underline text-current">
                {site.icon && (
                    <div className={`mx-auto mb-4 ${!site.webHook ? 'w-28 h-28' : 'w-16 h-16'}`}>
                        <span dangerouslySetInnerHTML={{ __html: site.icon }}></span>
                    </div>
                )}
                <h2 className="text-lg font-semibold mb-2">{site.name}</h2>
                {site.webHook && (
                    <div className="flex justify-center flex-wrap">
                        {site.webHook.map((hook) => (
                            <div className="w-auto p-2" key={hook.name}>
                                <HookButton hook={hook} onClick={(e, id, name) => {
                                    // dont trigger the parent <a> event
                                    e.preventDefault()
                                    e.stopPropagation()
                                    triggerWebhook(e, id, name)
                                }} />
                            </div>
                        ))}
                    </div>
                )}
            </a>
        </div>

    )
}
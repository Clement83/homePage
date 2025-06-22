'use client'

import { useState, useRef } from 'react'
import configuration from '../config'
import { Toaster } from './components/toaster'
import { Card } from './components/card'
import { SearchableTitle } from './components/searchableTitle'
import DataMonitor from './components/persistant/DataMonitor'
import ChatToggle from './components/chat/chat'

export default function Home() {
  const { config, sites, dataMonitor } = configuration
  const [toasterMessage, setToasterMessage] = useState('')
  const [toasterVisible, setToasterVisible] = useState(false)
  const [filterText, setFilterText] = useState('')
  const toasterTimeout = useRef<NodeJS.Timeout | null>(null)

  const triggerWebhook = async (event: any, id: string, name: string) => {
    let button = null
    if (event) {
      event.stopPropagation()

      button = event.currentTarget
      button.classList.add('loading')
    }

    console.log(`Start Webhook '${id}'.`)
    try {
      const response = await callApi(id)
      button?.classList.remove('loading')

      if (response.ok) {
        const result = await response.json()
        console.log(`Webhook '${name}' triggered successfully.`)
        button?.classList.add('success')
        showToaster(result.response.logEntry.output)
      } else {
        console.error(`Failed to trigger webhook '${name}'.`)
        button?.classList.add('error')
        const result = await response.json()
        showToaster(result.error)
      }
    } catch (error) {
      console.error(`Error triggering webhook '${name}':`, error)
      button?.classList.remove('loading')
      button?.classList.add('error')
    }

    setTimeout(() => {
      button?.classList.remove('success', 'error')
    }, 2000)
  }

  const callApi = async (id: string) =>
    fetch('/api/trigger', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })

  const showToaster = (message: string) => {
    setToasterMessage(message)
    setToasterVisible(true)
    resetToasterTimeout()
  }

  const closeToaster = () => {
    setToasterVisible(false)
    if (toasterTimeout.current) {
      clearTimeout(toasterTimeout.current)
      toasterTimeout.current = null
    }
  }

  const resetToasterTimeout = () => {
    if (toasterTimeout.current) {
      clearTimeout(toasterTimeout.current)
    }
    toasterTimeout.current = setTimeout(() => {
      closeToaster()
    }, 10000)
  }

  const handleMouseEnter = () => {
    if (toasterTimeout.current) {
      clearTimeout(toasterTimeout.current)
    }
  }

  const handleMouseLeave = () => {
    resetToasterTimeout()
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      {config.logout && (
        <div className="absolute top-4 right-4 w-8">
          <a
            href={config.logout.url}
            title={config.logout.name}
            className="text-white hover:text-gray-400"
          >
            <span dangerouslySetInnerHTML={{ __html: config.logout.icon }}></span>
          </a>
        </div>
      )}

      <div className="p-6 flex w-full flex-col md:flex-row">
        <div className="flex flex-wrap gap-4 absolute top-4 left-4 max-w-[calc(100%-6rem)]">
          {dataMonitor.map(dataConfig => (
            <DataMonitor key={dataConfig.id} onGetData={(id) => callApi(id)} config={dataConfig} />
          ))}
        </div>
        <ChatToggle triggerWebhook={triggerWebhook} />

        <div className="flex-1 flex justify-center mt-4 md:mt-0">
          <SearchableTitle text={config.title} onChange={(text) => setFilterText(text)} />
        </div>
      </div>

      <div id="cards-container" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {sites
          .filter(
            (site) =>
              !filterText.trim() ||
              site.name.toLowerCase().includes(filterText.toLowerCase()) ||
              site.description?.toLowerCase().includes(filterText.toLowerCase())
          )
          .map((site) => (
            <Card site={site} triggerWebhook={triggerWebhook} key={site.name} />
          ))}
      </div>

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Toaster
          onClickCloseButton={closeToaster}
          isVisible={toasterVisible}
          message={toasterMessage}
        />
      </div>
    </div>
  )
}

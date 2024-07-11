'use client'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import configuration from '../config'
import { Toaster } from './components/toaster'
import { HookButton } from './components/hookButton'
import { Card } from './components/card'

export default function Home() {
  const { config, sites } = configuration
  const [toasterMessage, setToasterMessage] = useState('')
  const [toasterVisible, setToasterVisible] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('Service Worker registered', reg)
        })
        .catch(err => {
          console.error('Service Worker registration failed', err)
        })
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', () => {
      console.log('home page installed')
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleBeforeInstallPrompt = (e) => {
    e.preventDefault()
    const deferredPrompt = e
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
    })
  }

  const triggerVisit = (url) => {
    if (url) {
      window.open(url, '_blank')
    }
  }

  const triggerWebhook = async (event, id, name) => {
    event.stopPropagation()

    const button = event.currentTarget
    button.classList.add('loading')

    console.log(`Start Webhook '${id}'.`)
    try {
      const response = await fetch('/api/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      button.classList.remove('loading')
      if (response.ok) {
        const result = await response.json()
        console.log(`Webhook '${name}' triggered successfully.`)
        button.classList.add('success')
        showToaster(result.response.logEntry.output)
      } else {
        console.error(`Failed to trigger webhook '${name}'.`)
        button.classList.add('error')
        const result = await response.json()
        showToaster(result.error)
      }
    } catch (error) {
      console.error(`Error triggering webhook '${name}':`, error)
      button.classList.remove('loading')
      button.classList.add('error')
    }
    setTimeout(() => {
      button.classList.remove('success', 'error')
    }, 2000)
  }

  const showToaster = (message: string) => {
    setToasterMessage(message)
    setToasterVisible(true)
    setTimeout(closeToaster, 10000)
  }

  const closeToaster = () => {
    setToasterVisible(false)
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">

      {config.logout && (
        <div className="absolute top-4 right-4 w-8">
          <a href={config.logout.url} title={config.logout.name} className="text-white hover:text-gray-400">
            <span dangerouslySetInnerHTML={{ __html: config.logout.icon }}></span>
          </a>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">{config.title}</h1>
      <div id="cards-container" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {sites.map((site, index) => (
          <Card site={site} triggerVisit={triggerVisit} triggerWebhook={triggerWebhook} key={site.name} />
        ))}
      </div>

      <Toaster onClickCloseButton={closeToaster} isVisible={toasterVisible} message={toasterMessage} />
    </div>
  )
}

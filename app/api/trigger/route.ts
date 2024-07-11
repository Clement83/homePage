import axios from 'axios'
import { parseCookies } from 'nookies'
import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json(
            { error: `Method ${req.method} Not Allowed` }, { status: 405 }
        )
    }

    const { id } = await req.json()
    const baseUrl = process.env.OLIVETIN_URL
    const fullUrl = `${baseUrl}${id}`

    console.info(`Webhook triggered: ${fullUrl}`, req.body)

    if (!id) {
        console.error("ID missing in request")

        return NextResponse.json(
            { error: `ID is required` }, { status: 400 }
        )
    }

    const cookieStore = cookies()
    const mycookies = cookieStore.getAll()

    try {
        const response = await axios.get(fullUrl, {
            headers: {
                Cookie: mycookies
                    .map((cook) => `${cook.name}=${cook.value}`)
                    .join('; '),
            },
        })
        console.info(`Webhook successful: ${fullUrl}`)
        return NextResponse.json(
            { response: response.data }, { status: 200 }
        )
    } catch (error: any) {
        console.error(`Webhook failed: ${fullUrl}, error: ${error.message}`)

        return NextResponse.json(
            { error: `Error ${error.message}` }, { status: 500 }
        )
    }
}

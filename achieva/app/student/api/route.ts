import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Student API route is ready.' })
}

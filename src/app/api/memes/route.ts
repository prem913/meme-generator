import { NextRequest, NextResponse } from "next/server";
import memeTemplates from '@/app/(data)/memeTemplates';
import { NextApiRequest } from "next";
import { MemeTemplate } from "@/app/(data)/types";


const getTemplateWithId = (templates: MemeTemplate[],id:string) =>{
    const [template] = templates.filter(template => template.id === id)
    return template || templates[0]
  }
  

export async function GET() {
    return NextResponse.json(memeTemplates)
}

export async function POST(req:NextRequest) {
    const body = await req.json() as {memeId:string}
    const memeId = body.memeId
    return NextResponse.json(getTemplateWithId(memeTemplates,memeId))
}
import { MemeTemplate } from '@/app/(data)/types'
import { MemeEditor } from '@/app/(components)/MemeEditor'
import { PageProps } from '../../.next/types/app/page'
import MemeDisplay from './(components)/MemeDisplay';
import Link from 'next/link';


export default async function Home(props:PageProps) {
  const memeId = props.searchParams.meme ?? null;
  const templateRes = await fetch('http://localhost:3000/api/memes',{
    cache:'no-cache',
    method:'POST',
    body: JSON.stringify({memeId:memeId}),
  })
  const template = await templateRes.json() as MemeTemplate
  const templatesRes = await fetch('http://localhost:3000/api/memes')
  const templates = await templatesRes.json() as MemeTemplate[]
  return (
    <main className="max-w-[1200px]  mx-auto">
      <h1 className='font-bold text-2xl my-4'>Meme Generator</h1>
      <MemeEditor template={template} selectedId={memeId} />
      
    <div className="my-4 text-lg">
      Pick a Template.
    </div>
    <div
    className='grid gap-2 grid-cols-3'
    >
    {templates.map(memeTemplate => (<Link href={
      {
        pathname:'/',
        query:{
          meme:memeTemplate.id
        }
      }
    }
    prefetch={false}
    key={memeTemplate.id}><MemeDisplay
    template={
      memeTemplate
    }
    values={{}}
    /></Link>
    ))}
    </div>
    </main>
  )
}
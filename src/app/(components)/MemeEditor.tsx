"use client";
import { useForm } from "react-hook-form";

import MemeDisplay from "./MemeDisplay";

import { MemeTemplate } from "@/app/(data)/types";
import { componentToImage, copy2clipboard, downloadBlob } from "@/utils/componet2img";
import { MouseEventHandler, useEffect, useState } from "react";
const textValues = (template: MemeTemplate) =>
  template.textareas.reduce(
    (values, ta) => ({
      ...values,
      [ta.id]: ta.text,
    }),
    {} as Record<string, string>
  );



export const MemeEditor = ({ template,selectedId }: { template: MemeTemplate,selectedId:string }) => {
  const [copied,setCopied] = useState<string>('Copy')
  const selectedTemplate = template
  const { register,  watch, setValue } = useForm<{
    template: string;
    values: Record<string, string>;
  }>({
    defaultValues: {
      template: selectedTemplate.id,
      values: textValues(selectedTemplate),
    },
  });
  const values = watch("values");


  const handleDownload:MouseEventHandler<HTMLButtonElement> = async(evt) =>{
    evt.preventDefault()
    const memeEl = document.getElementById('meme') as HTMLDivElement
    if(!memeEl) return
    const imageBlob = await componentToImage(memeEl)
    downloadBlob(imageBlob, selectedTemplate.id)
  }

  
  const handleCopy:MouseEventHandler<HTMLButtonElement> = async(evt) =>{
    evt.preventDefault()
    const memeEl = document.getElementById('meme') as HTMLDivElement
    if(!memeEl) return
    const imageBlob = await componentToImage(memeEl)
    const status = await copy2clipboard(imageBlob)
    if(status){
      setCopied('Copied')
    }
    else setCopied('Copy failed')
  }

  useEffect(()=>{
    setCopied('Copy')
    setValue('values',textValues(template))
  },[setValue,template])

  return (
    <>
    <form>
      <div className="grid xs:grid-cols-1 md:grid-cols-[60%_40%]">
        <div>
        <div id="meme" className="flex aspect-auto h-auto overflow-hidden">
        <MemeDisplay template={template} values={values} />
        </div>
        <button className="px-4 mt-4 border-r border-white hover:opacity-80" onClick={handleDownload}>Download</button>
        <button className="px-4 mt-4" onClick={handleCopy}>{copied}</button>
        </div>
        <div className="px-2">
          {template.textareas.map((textarea, index) => (
            <div key={index} className="mt-5">
              <label className="capitalize" htmlFor={textarea.id}>{textarea.id}</label>
              <div>
                <input
                  className="py-2 px-4 text-black rounded-md outline-none focus:font-semibold w-full"
                  type="text"
                  {...register(`values.${textarea.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
    </>
  );
};

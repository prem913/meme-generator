"use client";
import Image from "next/image";
import { Anton } from "next/font/google";
import { useElementSize } from "usehooks-ts";

import { MemeTemplate } from "@/app/(data)/types";
const anton = Anton({ weight: "400", subsets: ["latin"] });

type Props = {
  template: MemeTemplate;
  values: Record<string, string>;
}

function MemeDisplay({
  template,
  values
}:Props) {
  const [memeRef, { width }] = useElementSize();
  const ratio = width / template.background.width;

  return (
    <div className="relative overflow-hidden" ref={memeRef}>
      <Image
        src={template.background.src}
        width={template.background.width}
        height={template.background.height}
        alt={template.background.alt}
        style={{
          width: "100%",
          overflow: "hidden",
        }}
        className="object-fill"
      />
      {template.textareas.map((textarea, index) => (
        <div
          key={index}
          className="absolute flex justify-center align-center items-center"
          style={{
            top: textarea.top * ratio,
            left: textarea.left * ratio,
            width: textarea.width * ratio,
            height: textarea.height * ratio,
          }}
        >
          <div
            className={`${anton.className} text-center ${
              textarea.color ?? "white"
            }-contrast-outline`}
            style={{
              fontSize: textarea.size * ratio,
              lineHeight: "1.1",
              color: textarea.color ?? "white",
            }}
          >
            {values[textarea.id] ?? textarea.text}
          </div>
        </div>
      ))}
    </div>
  );
}


export default MemeDisplay;
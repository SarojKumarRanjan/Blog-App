import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
import { Label } from "./ui/label"
// eslint-disable-next-line no-unused-vars
import config from "../conf.js"

//console.log(config.tinymceapikey);

// eslint-disable-next-line react/prop-types
export default function Rte({name,label,control,defaultValue}) {
  return (
    <div className="w-full">
{label && <Label>{label}</Label>}
<Controller
name={name || "content"}
control={control}
render={({field:{onChange}}) => (
    <Editor
    //apiKey={config.tinymceapikey}
    initialValue={defaultValue}
    init={{
        initialValue: defaultValue,
        height: 500,
        menubar: true,
        plugins: [
            "image",
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "anchor",
        ],
        toolbar:
        "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
    }}
    onEditorChange={onChange}
    />
)}


/>
    </div>
  )
}


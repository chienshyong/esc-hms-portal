'use client'

import Image from "next/image";
import { useCallback,useEffect, useState} from "react";
import { UploadFile,Cancel } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

export default function UploadImage({ onFilesChange,checkClear, setCheckClear}) {
    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
          setFiles(previousFiles => [
            // If allowing multiple files
            // ...previousFiles,
            ...acceptedFiles.map(file =>
              Object.assign(file, { preview: URL.createObjectURL(file) })
            )
          ])
        }

    if (rejectedFiles?.length) {
        setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
      }
    }, [])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'image/*': []
      },
      maxSize: 1024 * 1000,
      maxFiles: 5,
      onDrop
    })

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
      }, [files])
    
    useEffect(() => {
      onFilesChange(files);
    }, [files, onFilesChange]);  


    const removeFile = name => {
      setFiles(files => files.filter(file => file.name !== name))
    }

    const removeAll = () => {
      setFiles([])
      setRejected([])
    }

    const handleImageClear = (checkClear) =>{
        if (checkClear) {
            removeAll()
            setCheckClear(false)
        }
    }

    useEffect(() => {
        // Call handleImageClear whenever the checkClear variable changes
        handleImageClear(checkClear);
      }, [checkClear]);

    const removeRejected = name => {
      setRejected(files => files.filter(({ file }) => file.name !== name))
    }
    
    return (
        <section>
            <section className="flex flex-col items-center">
                <div className='flex flex-col justify-center rounded bg-gray-300 w-96 h-36 mt-4 cursor-pointer' {...getRootProps()}>
                    <input {...getInputProps({ name: 'file' })} />
                    <div className='flex flex-col items-center justify-center'>
                      <UploadFile fontSize="large"/>
                      {isDragActive ? (
                        <p>Drop the files here ...</p>
                      ) : (
                        <p>Drag & drop files here, or click to select files</p>
                      )}
                    </div>
                </div>
                {/* Indicate max files */}
                <p>* maximum 5 files</p>
            </section>
            
            <section>

                {/* Preview */}
                <div className='flex gap-4 items-center'>
                  <h3 className='title text-xl font-semibold'>Preview</h3>
                  <button
                    type='button'
                    onClick={removeAll}
                    className='h-8 rounded-md border text-[12px] font-bold uppercase text-stone-500 transition-colors hover:bg-red-500 hover:text-white'
                  >
                    Remove all files
                  </button>
                </div>


                {/* Accepted files */}
                <h3 className='title mt-5 pb-3 text-lg text-stone-600'>
                  Accepted Files
                </h3>
                <ul className='mt-6 grid grid-cols-[150px] gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 list-none'>
                  {files.map(file => (
                    <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={100}
                        height={100}
                        onLoad={() => {
                          URL.revokeObjectURL(file.preview)
                        }}
                        className='h-full w-full rounded-md object-contain'
                      />
                      <button
                        type='button'
                        className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-red-500 bg-red-500 transition-colors hover:bg-white'
                        onClick={() => removeFile(file.name)}
                      >
                        <Cancel className='h-5 w-5 fill-white transition-colors hover:fill-red-500' />
                      </button>
                      <p className='mt-2 text-[12px] font-medium text-stone-500'>
                        {file.name}
                      </p>
                    </li>
                  ))}
                </ul>
                    
                {/* Rejected Files */}
                <h3 className='title mt-12 text-lg font-semibold text-stone-600'>
                  Rejected Files
                </h3>
                <ul>
                  {rejected.map(({ file, errors }) => (
                    <li key={file.name}>
                      <div className="flex items-center gap-2">
                        <p className='text-sm font-medium text-stone-500 text-'>
                          {file.name}
                        </p>
                        <button
                        type='button'
                        className='rounded-md border px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-stone-500 transition-colors hover:bg-red-500 hover:text-white'
                        onClick={() => removeRejected(file.name)}
                      >
                        remove
                      </button>
                      {errors.map(error => (
                          <p key={error.code} className="text-center text-sm">{error.message}</p>
                          ))}
                      </div>
                    </li>
                  ))}
                </ul>
            </section>
        </section>
      );
}
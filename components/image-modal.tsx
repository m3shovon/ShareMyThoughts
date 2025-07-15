"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, ZoomIn, ZoomOut, Download } from "lucide-react"
import Image from "next/image"

interface ImageModalProps {
  src: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = src
    link.download = alt || "image"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const safeSrc = src?.startsWith('http') || src?.startsWith('/') ? src : '/placeholder.svg'

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-gray-700 p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold">Image Preview</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-gray-400 text-sm min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Image Container */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/50">
          <div className="transition-transform duration-200 ease-in-out" style={{ transform: `scale(${zoom})` }}>
            <Image
              src={safeSrc}
              alt={alt}
              width={300}
              height={300}
              className="max-w-full max-h-full object-contain rounded-lg"
              unoptimized
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

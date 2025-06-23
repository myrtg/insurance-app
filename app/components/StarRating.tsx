'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  initialRating?: number
  onRatingChange?: (rating: number) => void
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
}

export default function StarRating({ 
  initialRating = 0, 
  onRatingChange, 
  size = 'md',
  readonly = false 
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleClick = (value: number) => {
    if (readonly) return
    setRating(value)
    onRatingChange?.(value)
  }

  const handleMouseEnter = (value: number) => {
    if (readonly) return
    setHoverRating(value)
  }

  const handleMouseLeave = () => {
    if (readonly) return
    setHoverRating(0)
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = (hoverRating || rating) >= star
        return (
          <button
            key={star}
            type="button"
            className={`transition-colors ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } transform transition-transform`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
          >
            <Star
              className={`${sizeClasses[size]} ${
                isActive
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-400 hover:text-yellow-400'
              } transition-colors`}
            />
          </button>
        )
      })}
      {rating > 0 && (
        <span className="text-sm text-gray-400 ml-2">
          {rating}/5
        </span>
      )}
    </div>
  )
} 
'use client'

import React from 'react'
import { Card, CardContent, Typography, Button as MuiButton, Box } from '@mui/material'
import { cn, commonStyles } from '@/utils/cn'

interface HybridCardProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
  variant?: 'mui' | 'tailwind' | 'hybrid'
}

export function HybridCard({ 
  title, 
  description, 
  children, 
  className,
  variant = 'hybrid' 
}: HybridCardProps) {
  if (variant === 'mui') {
    return (
      <Card className={className}>
        <CardContent>
          <Typography variant="h6" component="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {children}
        </CardContent>
      </Card>
    )
  }

  if (variant === 'tailwind') {
    return (
      <div className={cn(commonStyles.card, className)}>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
        {children}
      </div>
    )
  }

  // Hybrid approach - MUI structure with Tailwind styling
  return (
    <Card 
      className={cn(
        'transition-all duration-300 hover:shadow-xl hover:scale-105',
        'bg-gradient-to-br from-white to-gray-50',
        className
      )}
    >
      <CardContent className="p-6">
        <Typography 
          variant="h6" 
          component="h3" 
          className="mb-2 font-bold text-gray-800"
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          className="text-gray-600 mb-4 leading-relaxed"
        >
          {description}
        </Typography>
        <Box className="space-y-2">
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}

// Example buttons combining MUI and Tailwind
export function HybridButtons() {
  return (
    <div className="flex gap-4 flex-wrap">
      {/* Pure MUI Button */}
      <MuiButton variant="contained" color="primary">
        MUI Button
      </MuiButton>
      
      {/* MUI Button with Tailwind classes */}
      <MuiButton 
        variant="outlined"
        className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
      >
        Hybrid Button
      </MuiButton>
      
      {/* Pure Tailwind Button */}
      <button className={cn(commonStyles.button.primary, 'hover:scale-105')}>
        Tailwind Button
      </button>
      
      {/* Custom gradient button */}
      <button className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl">
        Gradient Button
      </button>
    </div>
  )
}

// Example layout using Tailwind Grid with MUI components
export function ResponsiveGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {children}
    </div>
  )
}

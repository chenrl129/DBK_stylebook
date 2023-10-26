'use client';
import '@mdxeditor/editor/style.css';
import dynamic from 'next/dynamic'

export const MDXEditor = dynamic(
  () => import('@mdxeditor/editor/MDXEditor').then((mod) => mod.MDXEditor), 
  { ssr: false }
)

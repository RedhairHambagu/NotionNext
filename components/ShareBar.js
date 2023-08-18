import BLOG from '@/blog.config'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import ShareButtons from './ShareButtons'

const ShareBar = ({ post }) => {
  const router = useRouter()
  const [justifyContent, setJustifyContent] = useState('start')
  const shareBarRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      console.log('handleResize')
      if (shareBarRef.current) {
        const containerWidth = shareBarRef.current.offsetWidth
        if (containerWidth < 520) {
          setJustifyContent('start')
        } else {
          setJustifyContent('end')
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [shareBarRef])

  if (!JSON.parse(BLOG.POST_SHARE_BAR_ENABLE) || !post || post?.type !== 'Post') {
    return <></>
  }

  const shareUrl = BLOG.LINK + router.asPath

  return <div className='m-1 overflow-x-auto'>
        <div className='flex w-full md:justify-end'>
            <ShareButtons shareUrl={shareUrl} title={post.title} image={post.pageCover} body={
                post?.title +
                ' | ' +
                BLOG.TITLE +
                ' ' +
                shareUrl +
                ' ' +
                post?.summary
            } />
        </div>
    </div>
}
export default ShareBar

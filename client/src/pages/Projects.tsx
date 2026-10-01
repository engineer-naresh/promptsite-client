import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { Project } from '../types'
import { ArrowBigDownDashIcon, EyeIcon, EyeOffIcon, FullscreenIcon, LaptopIcon, Loader2Icon, MessageSquareIcon, SaveIcon, SmartphoneIcon, TabletIcon, XIcon } from 'lucide-react'
import { dummyConversations, dummyProjects } from '../assets/assets'

const Projects = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('desktop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const fetchedProject = dummyProjects.find((item) => item.id === projectId)

    if (fetchedProject) {
      setProject({ ...fetchedProject, conversation: dummyConversations })
      setIsGenerating(!fetchedProject.current_code)
    } else {
      setProject(null)
    }

    setLoading(false)
  }, [projectId])
  if (loading) {
    return (
      <>
        <div className='flex items-center justify-center h-[80vh]'>
          <Loader2Icon className='animate-spin text-violet-200' size={30} />
        </div>
      </>
    )
  }
  return project ? (
    <div className='flex flex-col h-screen w-full bg-gray-900 text-white'>
      {/* buldernavbar */}
      <div className="flex max-sm:flex-col sm:items-center gap-4 px-4 py-2 no-scrollbar">
        {/* left-sidebar */}
        <div className="flex items-center gap-2 sm:min-w-90 text-nowrap">
          <img src="/favicon.svg" alt="logo" className="h-6 cursor-pointer" onClick={() => navigate('/')} />
          <div className="max-w-64 sm:max-w-xs">
            <p className="capitalize truncate text-sm text-medium">{project.name}</p>
            <p className='text-xs text-gray-400 -mt-0.5'>Previewing last saved version</p>
          </div>
          <div className="sm:hidden flex-1 flex justify-end">
            {isMenuOpen ? <MessageSquareIcon onClick={() => setIsMenuOpen(false)} className='size-6 cursor-pointer' /> : <XIcon onClick={() => setIsMenuOpen(true)} className='size-6 cursor-pointer' />}
          </div>
        </div>
        {/* middle */}
        <div className='hidden sm:flex gap-2 bg-gray-950 p-1.5 rounded-md'>
          <SmartphoneIcon onClick={() => { setDevice('phone') }} className={`size-6 cursor-pointer ${device === 'phone' ? 'bg-gray-700' : ""}`} />
          <TabletIcon onClick={() => { setDevice('tablet') }} className={`size-6 cursor-pointer ${device === 'tablet' ? 'bg-gray-700' : ""}`} />
          <LaptopIcon onClick={() => { setDevice('desktop') }} className={`size-6 cursor-pointer ${device === 'desktop' ? 'bg-gray-700' : ""}`} />
        </div>
        {/* right-sidebar */}
        <div className="flex items-center justify-end gap-3 flex-1 text-xs sm:text-sm">
          <button>
           <SaveIcon size={16}/> Save
          </button>
          <Link target="_blank" to={`/preview/${projectId}`}>
          <FullscreenIcon size={16}/> Preview
          </Link>
          <button><ArrowBigDownDashIcon size={16}/> Download</button>
          <button>{project.isPublished?<EyeOffIcon size={16}/> : <EyeIcon size={16}/> }{project.isPublished?"unpublish":"publish"}</button>
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-[80vh]'>
      <p className='text-white text-lg'>Project not found</p>
    </div>
  )
}

export default Projects

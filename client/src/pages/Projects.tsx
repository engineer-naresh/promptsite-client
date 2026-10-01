import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import type { Project } from '../types'
import { Loader2Icon } from 'lucide-react'
import { dummyConversations, dummyProjects } from '../assets/assets'

const Projects = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating,setIsGenerating] = useState(true);
  const [device, setDevice] = useState<'phone' | 'tablet' | 'desktop'>('desktop');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving,setIsSaving] = useState(false);
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
if(loading){
  return (
    <>
    <div className='flex items-center justify-center h-[80vh]'>
      <Loader2Icon className='animate-spin text-violet-200' size={30}/>
    </div>
    </>
  )
}
  return project ? (
    <div>
      <h1>Projects</h1>
    </div>
  ) : (
    <div className='flex items-center justify-center h-[80vh]'>
      <p className='text-white text-lg'>Project not found</p>
    </div>
  )
}

export default Projects

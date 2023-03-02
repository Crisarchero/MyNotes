import React from 'react'
import PageForm from './PageForm'
import { useLoaderData } from 'react-router-dom'

const EditPage = () => {
  const page = useLoaderData()

  return (
    <PageForm page={page} />
  )
}

export default EditPage
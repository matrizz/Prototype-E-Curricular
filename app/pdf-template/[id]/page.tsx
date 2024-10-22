//@ts-nocheck
'use client'
import { useEffect, useState } from 'react';
import './PDF.css'
import useProtectedRoute from '../../hooks/useProtectedRoute';
import Loading from '../../components/loading';
import { useParams } from 'next/navigation';
import { getCurriculumById } from '@/app/resumes/data-fetch';

export default function Template() {

  const [data, setData] = useState()
  const { isLoading, canAccess } = useProtectedRoute(['admin'], '/not-authorized')
  const { id } = useParams()

  useEffect(() => {
    async function ft() {
      //@ts-ignore
      const dt = await getCurriculumById(id)
      setData(dt)
    }
    ft()
  }, [])

  if (isLoading || !canAccess) {
    return <Loading />
  }

  return (
    <div className='pb-1'>
      <span className='no-print fixed bottom-10 right-10 flex flex-col gap-2'>
        <button onClick={print} className='w-10 h-10 flex border border-gray-100 hover:bg-[#ffffff3a] shadow-md rounded-full items-center justify-center bg-white'>
          <img className='opacity-80' src="/icons8-print-90.png" width={24} height={24} alt="" />
        </button>
        <button onClick={print} className='w-10 h-10 flex border border-gray-100 hover:bg-[#ffffff3a] shadow-md rounded-full items-center justify-center bg-white'>
          <img className='opacity-80' src="/icons8-download-48.png" width={24} height={24} alt="" />
        </button>
      </span>
      <div className="container">
        <div className="left-column">
          <img src={data?.picture} alt="Foto de perfil" className="profile-img" />
          <p className='box-text'>{data?.pessoal.nome}</p>
          <div className="contact-info">
            <p>{data?.pessoal.celular}</p>
            <p className='email'>{data?.pessoal.email}</p>
          </div>
          <div className="section">
            <h3 className='txt-decoration'>CIDADE</h3>
            <p className=''>{data?.pessoal.cidade} - <span className='uppercase'>{data?.pessoal.uf}</span> </p>
            <p >CEP:{' '}
              {data?.pessoal.cep}
            </p>
          </div>
          <div className="section">
            <h3 className='txt-decoration'>CEP</h3>
            <p className='uppercase'>
            </p>
          </div>
        </div>

        <div className="right-column">
          <p className='title-decoration'>OBJETIVO:</p>
          <p className='txt-justify'>
            Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
            galisum ut eligendi vel odit atque. Non laboriosam distinctio et
            nisi molestiae qui mollitia consequuntur.

          </p>
          <div className="section">
            <p className='title-decoration'>Minhas Habilidades</p>
            <ul className='txt-justify'>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
            </ul>
            <p className='title-decoration'>Habilidades Complementares</p>
            <ul className='txt-justify'>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
              <li>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </li>
            </ul>
          </div>
          {/* <div className="section">
            <h3>Experiência</h3>

            <div className="job">
              <h4>Senior Software Engineer</h4>
              <p>Company Name &nbsp;&nbsp; 2022 - Present</p>
              <p>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </p>
            </div>

            <div className="job">
              <h4>Software Engineer</h4>
              <p>Company Name &nbsp;&nbsp; 2019 - 2022</p>
              <p>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </p>
            </div>

            <div className="job">
              <h4>Back-end Developer</h4>
              <p>Company Name &nbsp;&nbsp; 2017 - 2018</p>
              <p>
                Lorem ipsum dolor sit amet. Sed nisi tempore est perspiciatis
                galisum ut eligendi vel odit atque. Non laboriosam distinctio et
                nisi molestiae qui mollitia consequuntur.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

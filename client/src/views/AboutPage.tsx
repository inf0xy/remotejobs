import React from 'react';
import { remotiveSign } from '../utils/links';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <section className='flex flex-col items-center space-y-4 h-screen pt-20 overflow-y-scroll'>
      <img
        src={remotiveSign}
        className='scale-75'
        width='auto'
        height={200}
      />
      <h3 className='text-xl font-semibold'>Here at Remotive, we believe in </h3>
      <div className='flex flex-col items-center space-y-5 text-center'
      style={{marginBottom: '15px'}}>
        <h4 className='text-2xl font-semibold'> 1&#41; Remote work comes from trust.</h4>
        <div className='flex space-x-7 pb-5'>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Trust is paramount</p>
            <p className='font-medium'>We work at companies who trust us to do our best work, remotely.</p>
          </div>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Playing the long game</p>
            <p className='font-medium'>We work at companies who invest in long-term professional growth.</p>
          </div>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Family first</p>
            <p className='font-medium'>We work at companies who are family-friendly, we only pull an all-nighter for kids.</p>
          </div>
        </div>
        <hr className='text-black w-[75vw]'/>
      </div>
      <div className='flex flex-col items-center space-y-5 text-center' style={{marginBottom: '15px'}}>
        <h4 className='text-2xl font-semibold'> 2&#41; Remote is the future of the tech industry.</h4>
        <div className='flex space-x-7 pb-5'>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Tech companies are going remote</p>
            <p className='font-medium'>In 2022, at least 5 billion-dollar companies are 100% remote.</p>
          </div>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Applicants want remote</p>
            <p className='font-medium'>53.3% say remote options are a top priority &#40;<a className='text-cyan-500'>Stackoverflow, 2017</a>&#41;.</p>
          </div>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Remote workers won&apos;t go back</p>
            <p className='font-medium'>Most of them won&apos;t - ever - go back to an office.</p>
          </div>
        </div>
        <hr className='text-black w-[75vw]'/>
      </div>
      <div className='flex flex-col items-center space-y-5 text-center' style={{marginBottom: '15px'}}>
        <h4 className='text-2xl font-semibold'> 3&#41; Remote work is better together.</h4>
        <div className='flex space-x-7 pb-5'>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Talent is everywhere</p>
            <p className='font-medium'>Zip codes are becoming irrelevant, your trustworthiness is everything.</p>
          </div>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>We&apos;re not all nomads</p>
            <p className='font-medium'> Some of us travel, most of us work from home or coffee shops.</p>
          </div>
          <div className='card rounded w-48 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Remote is hard</p>
            <p className='font-medium'>You need a tribe to land a remote job and to rock it.</p>
          </div>
        </div>
        <hr className='text-black w-[75vw]'/>
      </div>
      <div className='flex flex-col items-center space-y-5 text-center' style={{marginBottom: '15px'}}>
        <h4 className='text-2xl font-semibold'>What to expect from Remotive?</h4>
        <div className='flex space-x-7 pb-5'>
          <div className='card rounded w-64 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Remotive is a movement</p>
            <p className='font-medium'>Remote work is taking over the Tech industry, it&apos;s not evenly distributed just yet. Remotive started in 2014, millions of people read our content. We run a popular job board, newsletter and community.</p>
          </div>
          <div className='card rounded w-64 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>People first, not robots</p>
            <p className='font-medium'>Every day, remote workers connect and mingle on our community. We don&apos;t rely on robots to share jobs, each job we share is hand-picked by our team. We practice what we preach: The Remotive team operates remotely.</p>
          </div>
          <div className='card rounded w-64 bg-base-100 p-7 space-y-2 shadow-sm'>
            <p className='text-black font-bold'>Networking and content</p>
            <p className='font-medium'>Landing a remote job can be tricky, we&apos;ve been there ourselves. Our articles, guides and lists have gathered millions of view. We&apos;re here to help! We believe that the best way to land a remote job is through networking.</p>
          </div>
        </div>
        <hr className='text-black w-[75vw]'/>
      </div>
      <div className='flex flex-col items-center space-y-5 text-center' style={{marginBottom: '50px'}}>
        <h4 className='text-2xl font-semibold'>What do I do next?</h4>
        <div className='flex space-x-7 w-full'>
          <div className='flex space-x-7 pb-5'>
            <div className='flex flex-col card rounded w-64 bg-base-100 space-y-2 shadow-sm'>
              <div className='card-content py-7 px-10 text-base-200' style={{backgroundColor: 'rgb(39 131 162)'}}>
                <h3 className='font-bold'>Career</h3>
                <p className='font-medium'>Get Hired and Get ahead, remotely</p>
              </div>
              <ul className='font-medium list-disc pt-5 pb-7 px-10 space-y-3'>
                <li>Stand out and get in touch with hiring managers.</li>
                <li>See how you compare to other applicants.</li>
                <li>Learn new skills to advance your career.</li>
              </ul>
            </div>
          </div>
          <div className='flex space-x-7 pb-5'>
            <div className='flex flex-col card rounded w-64 bg-base-100 space-y-2 shadow-sm'>
              <div className='card-content py-7 px-10 text-base-200' style={{backgroundColor: 'rgb(81 84 98)'}}>
                <h3 className='font-bold'>Remote worker</h3>
                <p className='font-medium'>Grow and nurture your network</p>
              </div>
              <ul className='font-medium list-disc pt-5 pb-7 px-10 space-y-3'>
                <li>Learn from your peers.</li>
                <li>Share your knowledge.</li>
                <li>Network, remotely.</li>
              </ul>
            </div>
          </div>
          <div className='flex space-x-7 pb-5'>
            <div className='flex flex-col card rounded w-64 bg-base-100 space-y-2 shadow-sm'>
              <div className='card-content py-7 px-10 text-base-200 h-[129px]' style={{backgroundColor: 'rgb(178 56 56)'}}>
                <h3 className='font-bold'>Sale</h3>
                <p className='font-medium'>Promote your business</p>
              </div>
              <ul className='font-medium list-disc pt-5 pb-7 px-10 space-y-3'>
                <li>Find leads and accounts, remotely.</li>
                <li>Learn about remote work.</li>
                <li>Build trusted relationships with remote workers.</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      <hr className='w-full'/>
      <Footer />
    </section>
  )
};

export default AboutPage;
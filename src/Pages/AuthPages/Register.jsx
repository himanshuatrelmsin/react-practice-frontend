import React from 'react'
import bgimage from '../../../src/assets/images/bg.jpg';
import './Auth.scss'
import BreadCrumb from '../../components/Breadcrumb/Breadcrumb';
import RegisterForm from '../../components/AuthComponents/RegisterForm';
function Register() {
  return (
    <>
    <BreadCrumb 
      title="Register"

    />
      <section className='py-10 authDesign'>
        <div className='container mx-auto' style={{ backgroundImage: `url(${bgimage})` }}>
          <div className='overlay' style={{ background: "linear-gradient(45deg, black, transparent)" }}>
            <div className='row my-0 mx-auto p-5'>
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register

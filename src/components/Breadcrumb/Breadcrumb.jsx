import React from 'react'
import './breadcrumb.scss';
import banner from '../../assets/images/banner2.jpg';
import Typography from '../../components/Typography';
function BreadCrumb(Props) {
    
    return (
        <>
            <section className='py-12 breadcrumb' style={{ backgroundImage: `url(${banner})` }}>
                <div className='container py-12 mx-auto'>
                    <div className='row'>
                        <Typography tag='h1' className='title'>{Props.title}</Typography>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BreadCrumb

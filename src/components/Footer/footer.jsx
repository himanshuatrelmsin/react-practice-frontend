import React from 'react'
import banner from '../../assets/images/footer.jpg';
import './footer.scss';
import { Link } from 'react-router-dom';
import Typography from '../Typography';
function Footer() {
    return (
        <>
            <footer style={{ backgroundImage: `url(${banner})` }}>
                <div className='overlay py-12'>
                    <div className='container mx-auto'>
                        <div className='grid grid-cols-4 gap-4 py-5 mt-5'>
                            <div className="col-span-2">
                                <Link to="/" className=' text-base-200 font-bold text-3xl'>Logo</Link>
                                <Typography tag="p" className='my-5 text-base-200 font-normal text-base max-w-lg'>
                                    Founded in 1998, CozyStay Lodge is a luxury boutique hotel in the heart of Napa Valley, immersing you in an idyllic setting against the pure sky. Stay, sip, and savor the best of Napa wine country at CozyStay.
                                </Typography>
                                <div className='flex gap-4 mt-4'>
                                    <a href="https://www.facebook.com/" target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24">
                                            <path fill="#ffffff" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                        </svg>
                                    </a>
                                    <a href="https://x.com/" target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                            <path fill="#ffffff" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/" target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                                            <path fill="#ffffff" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/" target='_blank'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24">
                                            <path fill="#ffffff" d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="">
                                <Typography className=' text-base-200 font-bold text-3xl'>Menu</Typography>
                                <ul className="footer-menu ms-auto mt-5">
                                    <li className="footer-item mb-2">
                                        <Link className="text-base-200 text-base font-normal " to="/" >Home</Link>
                                    </li>
                                    <li className="footer-item mb-2">
                                        <Link className="text-base-200 text-base font-normal" to="/about" >About</Link>
                                    </li>
                                    <li className="footer-item mb-2">
                                        <Link className="text-base-200 text-base font-normal" to="/contact" >Contact</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="">
                                <Typography className=' text-base-200 font-bold text-3xl'>Contact us</Typography>
                                <ul className="footer-links ms-auto mt-5">
                                    <li className="footer-link mb-2 flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                                            <path fill="#ffffff" d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
                                        </svg>
                                        <a className="text-base-200 text-base font-normal " href="mailto:someone@example.com" >someone@example.com</a>
                                    </li>
                                    <li className="footer-link mb-2 flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                                            <path fill="#ffffff" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                                        </svg>
                                        <a className="text-base-200 text-base font-normal" href="tel:+91 1234567890" >+91 1234567890</a>
                                    </li>
                                    <li className="footer-link mb-2 flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                                            <path fill="#ffffff" d="M256 0c17.7 0 32 14.3 32 32l0 34.7C368.4 80.1 431.9 143.6 445.3 224l34.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-34.7 0C431.9 368.4 368.4 431.9 288 445.3l0 34.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.7C143.6 431.9 80.1 368.4 66.7 288L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l34.7 0C80.1 143.6 143.6 80.1 224 66.7L224 32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" />
                                        </svg>
                                        <a className="text-base-200 text-base font-normal" href="https://maps.app.goo.gl/Si1acX2FWTNypBJr5" >Palash Parisar, Rau, Indore</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='copyright' style={{ background: "#000000cc" }}>
                    <div className='container mx-auto'>
                        <div className='grid grid-cols-2 gap-4'>
                            <Typography tag="p" className='my-5 text-base-200 font-normal text-base max-w-lg'>
                                © Copyright CozyStay WordPress Theme for Hotel Booking.
                            </Typography>
                            <ul className="flex justify-end gap-4 ms-auto mt-5">
                                <li className="footer-item mb-2">
                                    <Link className="text-base-200 text-base font-normal " to="/privacy-policy" >Privacy Policy</Link>
                                </li>
                                <li className="footer-item mb-2">
                                    <Link className="text-base-200 text-base font-normal" to="/term-conditions" >Terms & Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

            </footer >
        </>
    )
}

export default Footer

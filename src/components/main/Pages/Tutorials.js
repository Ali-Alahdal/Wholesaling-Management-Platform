import Video from "./SmallComponents/Video";

function Main(){
   return (
      <main className=''>
       
       <div className="main_div ms-5 me-5">

            <div className='dark_mode d-flex justify-content-between shadow t_bg_c bg-gradient rounded-5 p-5  '>
               <div className='align-self-center'> 
                  <h1>Tutorials  </h1>
               </div>
               <div>
               <i class="big_icons bi bi-collection-play-fill"></i> 
               </div>

            </div>

            <section className='ms-3 mt-4 '>
               
               {/* Sub title for the section */}
               <div className=' w-100  mb-5 mt-5'>
                     <h3 className='d-block t_t_c '>Tutorials For Businesses <i class="bi bi-arrow-right-circle-fill"></i> </h3>
               </div>

                  {/* The Grid for Categories Section */}
                  <div className='row row-cols-2 gap-5 '> 
                     <Video src="https://www.youtube.com/embed/Iu1T7j2FA4M?si=9wEc_GuQcrEN_xFc" />
                    
                     <Video src="https://www.youtube.com/embed/Iu1T7j2FA4M?si=9wEc_GuQcrEN_xFc" />
                  </div>

            </section>


            <section className='ms-3 mt-5'>
               
               {/* Sub title for the section */}
               <div className=' w-100  mb-5 mt-5'>
                     <h3 className='d-block t_t_c '>Tutorials For Suppliers <i class="bi bi-arrow-right-circle-fill"></i> </h3>
               </div>

                  {/* The Grid for Categories Section */}
                  <div className='row row-cols-2 gap-5 '> 
                     <Video src="https://www.youtube.com/embed/Iu1T7j2FA4M?si=9wEc_GuQcrEN_xFc" />
                     
                     <Video src="https://www.youtube.com/embed/Iu1T7j2FA4M?si=9wEc_GuQcrEN_xFc" />
                  </div>

            </section>

            </div>
         
    </main>
   );
}

export default Main;
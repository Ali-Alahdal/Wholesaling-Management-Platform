import "../../../styles/main/Sidebar.css"
import SideBTN from "./Sidebar/SidebarBTN"

function Sidebar()
{
    return (
       <>

        {/* The Sidebar */}
        <div className='hidden_sidebar h-100'></div>
        
        <aside className="sidebar position-fixed h-100">

            {/* Logo Section */}
            <section className='w-100 text-center mt-5  p-4 '>
                <h1>Logo </h1>
            </section>


            {/* Buttons Section */}
            <section className='text-center me-1 mt-5 '>

                <ul className="list-unstyled fs-6 text-decoration-none">
                    {/* SideBTN is another component have li and link elemnts in it */}
                    <SideBTN toWhere="/" value="Main Page" icon="icons bi bi-house-fill  fs-5 " />
                    <SideBTN toWhere="/categories" value="Categories" icon="icons bi bi-layers-fill  fs-5" />
                    <SideBTN toWhere="/suppliers" value="Suppliers" icon="icons bi bi-box-seam-fill  fs-5" />
                    <SideBTN toWhere="/tutorials" value="Tutorials" icon="icons bi bi-collection-play-fill fs-5" />
                </ul>
                
            </section>
            

        </aside>
       </>
     
      );
}







export default Sidebar;
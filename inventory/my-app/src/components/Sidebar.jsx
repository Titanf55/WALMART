import React from 'react';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar,onPageChange}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> MENU
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <button onClick={() => onPageChange("dashboard")}>
            <BsGrid1X2Fill className='icon' /> Dashboard
            </button>
            </li>
            <li className='sidebar-list-item'>
                <button onClick={() => onPageChange("Products")}>
                
                    <BsFillArchiveFill className='icon'/> Products
                </button>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/>Scan Products
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                <button onClick={() => onPageChange("inventory")}>
                    <BsListCheck className='icon'/> Inventory
                </button>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
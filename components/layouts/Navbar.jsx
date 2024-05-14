import Image from 'next/image';
import Profile from '../../public/images/profile.svg'

const CustomNavbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-black" style={{position: "fixed", width: "100%", zIndex: 1}}>
        <a className="navbar-brand text-white" href="#">Dashboard</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
          <div className="nav-link">
            <Image src={Profile} alt="profile" width={40} height={40} className='nav-profile-img' />
          </div>
        </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default CustomNavbar;
  
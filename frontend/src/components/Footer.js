import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#68c7c1', color: '#fff', padding: '20px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <p>&copy; 2024 Salem State University ArtyParty. All rights reserved.</p>
      </div>
      <div style={{ textAlign: 'right', paddingRight: '20px' , lineHeight: '.3'}}>
        <p>To submit your artwork</p>
        <p>email s_masse1@salemstate.edu.</p>
      </div>
    </footer>
  );
};

export default Footer;

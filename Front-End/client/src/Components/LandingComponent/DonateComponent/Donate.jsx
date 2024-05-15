import React from 'react';
import './Donate.css'

function Donate() {
  return (
    <div className='donate'>
      <div>
        <h1>DONATE AMOUNT</h1>
        <form action="">
            <div>
            <label htmlFor="">ENTER AMOUNT</label>
            <input type="text" />
            </div>
            <div>
            <label htmlFor="">BANK NAME</label>
            <input type="text" />
            </div>
            <div>
                <button>DONATE</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Donate;

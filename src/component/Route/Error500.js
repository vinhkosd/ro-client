import React from 'react';
// import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';
// import './styles.css';

const Page = () => {
  return(
    <div className="page-err">
      {/* <QueueAnim type="bottom" className="ui-animate"> */}
        <div key="1">
          <div className="err-container text-center">
            <div className="err-code-container">
              <div className="err-code"> <h1>500</h1> </div>
            </div>
            <h2>Sorry, server goes wrong</h2>
            <Button onClick={() => {window.location.href = 'login';window.location.reload();}}>Về trang đăng nhập</Button>
          </div>
        </div>
      {/* </QueueAnim> */}
    </div>
  );
}

export default Page;

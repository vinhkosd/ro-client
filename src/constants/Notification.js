import { notification } from 'antd';

const openNotification = (type, message) => {
  const objMessage = {
    'success': 'Success Information',
    'info': 'Information',
    'warning': 'Warning',
    'error': 'Error Information',
  }
  
  const durationByType = {
    'success': 2,
    'info': 2,
    'warning': 10,
    'error': 15,
  }
  
  notification[type]({
    message: objMessage[type],
    description: message,
    duration: durationByType[type],
    className: `notification-${type}`,
    placement: 'bottomLeft'
  });
};

export default openNotification;
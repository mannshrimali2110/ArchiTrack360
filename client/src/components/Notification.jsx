import PropTypes from 'prop-types';

const Notification = ({ message, type = 'success' }) => {
  const types = {
    success: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      icon: '✅'
    },
    error: {
      bgColor: 'bg-red-100',
      textColor: 'text-red-800',
      borderColor: 'border-red-200',
      icon: '❌'
    },
    warning: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      icon: '⚠️'
    }
  };

  const style = types[type];

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border ${style.bgColor} ${style.textColor} ${style.borderColor} shadow-lg transition-all duration-500 ease-in-out`}>
      <div className="flex items-center">
        <span className="text-xl mr-2">{style.icon}</span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning'])
};

export default Notification;
import { type ButtonProps } from '../../models/custom-models';

export const Button: React.FC<ButtonProps> = ({ onClick, style, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        margin: '0 6px',
        fontSize: '14px',
        borderRadius: '4px',
        border: '1px solid #999',
        backgroundColor: 'green',
        cursor: 'pointer',
        color: 'white',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

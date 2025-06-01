import { type CellProps } from "../../models/grid-models";

export const Cell: React.FC<CellProps> = ({ alive, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: 20,
        height: 20,
        backgroundColor: alive ? 'black' : 'white',
        border: '1px solid #ccc',
      }}
    />
  );
};

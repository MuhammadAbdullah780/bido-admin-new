type Props = {
  children: React.ReactNode;
  title?: string;
};

const CustomCard = ({ children, title }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default CustomCard;

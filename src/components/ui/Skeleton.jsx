const SkeletonRow = ({ height = "3", colSpan }) => {
  const conditionalClasses = `bg-blue-200 rounded h-${height} col-start-1 col-span-${colSpan}`;

  return <div className={conditionalClasses} />;
};

const Skeleton = ({ rowProps }) => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse">
        <div className="grid grid-cols-2 space-y-6 py-1">
          {rowProps.map((props, index) => (
            <SkeletonRow key={index} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

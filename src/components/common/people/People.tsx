export const People = ({ peoples }: { peoples?: string[] }) => {
  return (
    <div>
      {peoples?.map((people, index) => (
        <div key={index}>
          {people}
          {peoples.length !== index + 1 && ','}
        </div>
      ))}
    </div>
  );
};

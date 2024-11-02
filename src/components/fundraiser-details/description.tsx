const Description = ({ description }: { description: string }) => {
  return (
    <div className="[grid-area:description] py-4 prose prose-sm max-w-none pb-10">
      {description}
    </div>
  );
};

export default Description;
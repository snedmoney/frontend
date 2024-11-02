import SupportWord from "./support-word";

const SupportWords = () => {
  return (
    <div className="py-10 border-b border-content4">
      <h2 className="mb-3">Words of support (10)</h2>
      <p>Please donate to share words of support.</p>
      <SupportWord />
      <SupportWord />
      <SupportWord />
    </div>
  );
};

export default SupportWords;
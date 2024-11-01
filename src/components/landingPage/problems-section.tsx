import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { RiUserUnfollowLine } from "react-icons/ri";

const ProblemsSection = () => {
  const problems = [
    {
      icon: <TbCurrencyDollarOff size={24} />,
      title: "Limited Monetization",
      description:
        "Traditional monetization methods like ads or sponsorships don't suit all types of content or creators, limiting their ability to earn from their work in ways that fit their style and audience.",
    },
    {
      icon: <LiaShoppingBagSolid size={24} />,
      title: "Technical Hurdles",
      description:
        "Complex e-commerce setups hinder creators from efficiently selling their products or services.",
    },
    {
      icon: <RiUserUnfollowLine size={24} />,
      title: "Platform Dependency",
      description:
        "Relying on social media or ad revenue leaves creators vulnerable to algorithm changes or demonetization, highlighting the need for more stable, direct support.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-background" id="challenges">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-danger font-bold mb-4">CHALLENGES</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Content creation is hard. Monetization is harder.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-content1">
              <CardHeader className="pb-2 pt-6 px-6 flex-col items-start">
                <div className="bg-danger/20 p-3 rounded-full mb-4">
                  <div className="text-danger">{problem.icon}</div>
                </div>
                <h3 className="font-bold text-large">{problem.title}</h3>
              </CardHeader>
              <CardBody className="px-6 pb-6 pt-2 text-sm text-foreground-600">
                {problem.description}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;

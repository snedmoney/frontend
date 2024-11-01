import { Accordion, AccordionItem } from "@nextui-org/react";

const FAQSection = () => {
  const faqItems = [
    {
      question: "What is Sned?",
      answer:
        "Sned is a crypto-powered platform that helps creators monetize their content. You can accept tips, launch fundraising campaigns, set up monthly memberships, and sell services, merchandise, or digital content — all using your preferred cryptocurrency, in one convenient place.",
    },
    {
      question: "Why choose Sned?",
      answer:
        "Unlike traditional platforms, we use blockchain for full transparency and to prevent chargeback and payment frauds. We cannot block or restrict transactions, offering truly unrestricted global payments and instant settlements. With Sned, you get more security, faster payments, and greater control over your earnings.",
    },
    {
      question: "How do I start accepting payments on Sned?",
      answer:
        "It's simple! Connect your wallet, set up your profile, and share your unique profile link. You'll be ready to accept tips, donations, or set up memberships in no time.",
    },
    {
      question: "What cryptocurrencies can supporters use?",
      answer:
        "Supporters can use any cryptocurrency we support on any chain, regardless of your preferred payment method. Our platform automatically converts the payment to your chosen cryptocurrency, making it easy for fans to support you with whatever crypto they have.",
    },
    {
      question: "What cryptocurrencies can I accept?",
      answer:
        "We support thousands of cryptocurrencies across multiple chains, including popular ones like Ethereum, Arbitrum, Base, Optimism, Binance Smart Chain and more. You can choose/change which cryptocurrencies to accept in your page settings.",
    },
    {
      question: "How do I access my earnings?",
      answer:
        "There's no need to withdraw! Each transaction is sent directly to your wallet and settled in real-time. You can use your earnings immediately without waiting for processing times.",
    },
    {
      question: "Are there any fees?",
      answer:
        "We charge a 1% fee on transactions to maintain and improve our services. This exact amount is transparently displayed for every transaction.",
    },
    {
      question: "How secure is Sned?",
      answer:
        "Security is our top priority. We use Wormhole, a leading interoperability protocol that enables secure cross-chain transactions. Wormhole's security features include real-time monitoring, and multiple independent security audits. Their battle-tested infrastructure has safely transferred over $35 billion in assets. Additionally, we employ industry-standard encryption and follow best practices to protect your funds and data.",
    },
  ];

  return (
    <section className="py-16 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-primary font-bold mb-2">FAQ</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h1>

        <Accordion className="w-full" selectionMode="multiple" variant="light">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.question}
              className="mb-2"
              title={item.question}
            >
              <p className="text-foreground-600">{item.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;

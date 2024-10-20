import PaymentWidget from "@/components/paymentWidget/payment-widget";

export default function IndexPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <PaymentWidget />
    </section>
  );
}

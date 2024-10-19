import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import DefaultLayout from "@/layouts/default";
import PaymentWidget from "@/components/paymentWidget/payment-widget";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
        <PaymentWidget />
      </section>
    </DefaultLayout>
  );
}
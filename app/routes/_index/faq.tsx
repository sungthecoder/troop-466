import { FAQItem } from "~/lib/fetch-faqs";

type FAQs = {
    faqs: FAQItem[];
};

export const FAQ = ({ faqs }: FAQs) => {
    return (
        <section className="py-12 bg-us-200"> 
            <div className="h-60">FAQ
                {faqs.map(({ question, answer }, index) => (
                    <div key={index} className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" defaultChecked/>
                        <div className="collapse-title text-xl font-medium">{question}</div>
                        <div className="collapse-content">
                            <p>{answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
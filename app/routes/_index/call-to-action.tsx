import ReactMarkDown from "react-markdown";
import { CallToActionProps } from "~/lib/get-call-to-action";

export const CallToAction = ({
  heading,
  message,
  url,
  faqs,
}: CallToActionProps) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex flex-col lg:w-1/3 flex-1 p-5 bg-opacity-10 bg-white rounded-lg gap-12">
          <h2 className="text-white uppercase font-serif text-2xl">
            {heading}
          </h2>
          <ReactMarkDown className="text-white prose">{message}</ReactMarkDown>
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-secondary uppercase text-white visited:text-white visited:hover:text-gray-900"
          >
            Apply Online Now!
          </a>
        </div>
        <div className="lg:w-2/3 flex-1 p-5 bg-white rounded-lg">
          {faqs.map(({ question, answer }, index) => (
            <div
              key={question}
              className="my-3 collapse collapse-plus bg-troop466-100"
            >
              <input
                type="radio"
                name="faq-accordian"
                defaultChecked={!index}
              />
              <div className="collapse-title text-xl font-medium">
                {question}
              </div>
              <div className="collapse-content">
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

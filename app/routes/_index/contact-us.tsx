import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faEnvelope,
  faSign,
} from "@fortawesome/free-solid-svg-icons";
import { type ContactUsProps } from "~/lib/get-contact";

export const ContactUs = ({
  email,
  web3formAccessKey,
  address,
  website,
}: ContactUsProps) => (
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="lg:w-2/3 flex-1">
        <form
          className="bg-white p-4 rounded-md"
          id="contact"
          action="https://api.web3forms.com/submit"
          method="post"
        >
          <input type="hidden" name="access_key" value={web3formAccessKey} />
          <input
            type="hidden"
            name="redirect"
            value="https://web3forms.com/success"
          />
          <div className="flex flex-col gap-8">
            <div className="flex flex-1 border-b-2 border-b-gray-300">
              <h2 className="text-2xl uppercase font-bold font-serif">
                Ask us questions
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <label className="input input-bordered flex items-center gap-2 flex-1">
                <input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="YOUR NAME...*"
                  required
                />
                <FontAwesomeIcon icon={faAddressCard} />
              </label>
              <label className="input input-bordered flex items-center gap-2 flex-1">
                <input
                  name="email"
                  type="text"
                  id="email"
                  pattern="[^ @]*@[^ @]*"
                  placeholder="YOUR EMAIL..."
                  required
                />
                <FontAwesomeIcon icon={faEnvelope} />
              </label>
              <label className="input input-bordered flex items-center gap-2 flex-1">
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  placeholder="SUBJECT...*"
                  required
                />
                <FontAwesomeIcon icon={faSign} />
              </label>
            </div>
            <div className="flex">
              <textarea
                className="textarea textarea-bordered flex-1"
                name="message"
                id="message"
                placeholder="YOUR MESSAGE..."
                required
              ></textarea>
            </div>
            <div className="w-max">
              <fieldset>
                <button
                  type="submit"
                  id="form-submit"
                  className="btn btn-primary text-white font-serif"
                >
                  SEND MESSAGE NOW
                </button>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <ul className="flex flex-col bg-troop466-500 text-white py-5 px-7 rounded-md">
          <li className="border-b py-5 mb-3">
            <h6 className="text-sm font-serif my-1">Email Address</h6>
            <span className="text-xl">{email}</span>
          </li>
          <li className="border-b pb-3 mt-2 my-3">
            <h6 className="text-sm font-serif my-1">Street Address</h6>
            <span className="text-xl">{address}</span>
          </li>
          <li className="border-b-0 pb-3 mt-2">
            <h6 className="text-sm font-serif my-1">Website URL</h6>
            <span className="text-xl">{website}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

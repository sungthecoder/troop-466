export const FAQ = () => {
    return (
        <section className="py-12 bg-troop466-200">
        <div className="h-60">FAQ
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" defaultChecked/>
            <div className="collapse-title text-xl font-medium">How can I/my scout join the troop?</div>
            <div className="collapse-content">
              <p>Insert Google Drive Link Here w Info</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">How can I access scoutbook?</div>
            <div className="collapse-content">
              <p>Insert Scoutbook Link Here</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">An additional section, just in case.</div>
            <div className="collapse-content">
              <p>If another thing comes in mind, put it here!</p>
            </div>
          </div>
        </div>
      </section>
    );
};
  
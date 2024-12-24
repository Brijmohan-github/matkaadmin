import React from "react";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-gray-100">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-center text-5xl font-extrabold text-white mb-12">
          Privacy Policy for Stargold Matka Matka
        </h1>

        <article className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 text-gray-800">
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
            <p>
              Welcome to <strong>Stargold Matka Matka</strong>. Your privacy is
              critically important to us. This policy aims to explain how we
              collect, use, and share your information. By using our app, you
              agree to the collection and use of information in accordance with
              this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Information Collection And Use
            </h2>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our service to you.
            </p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>
                <strong>Personal Data:</strong> While using our app, we may ask
                you to provide us with certain personally identifiable
                information that can be used to contact or identify you
                ("Personal Data").
              </li>
              <li>
                <strong>Usage Data:</strong> We may also collect information on
                how the app is accessed and used ("Usage Data").
              </li>
              <li>
                <strong>Cookies and Tracking Data:</strong> We don't use cookies
                and similar tracking technologies to track the activity on our
                app.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Use of Data</h2>
            <p>
              Stargold Matka Matka uses the collected data for various purposes:
            </p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>To provide and maintain our app</li>
              <li>To notify you about changes to our app</li>
              <li>
                To allow you to participate in interactive features of our app
                when you choose to do so
              </li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our app
              </li>
              <li>To monitor the usage of our app</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
          </section>

          {/* Continue adding sections as necessary, following the pattern above */}

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Changes To This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p>
              This policy is effective as of <strong>May 10, 2024</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
};

export default Privacy;

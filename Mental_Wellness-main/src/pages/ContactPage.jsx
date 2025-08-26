import React, { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

const ContactPage = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    setSubmitted(true);
    alert("📩 Contact Form Submitted!");
  };

  const onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div
      className={clsx(
        "min-h-screen px-4 sm:px-6 py-16 sm:py-20",
        isDark ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-900"
      )}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg mb-10 text-center leading-relaxed">
          We'd love to hear from you! Whether you have feedback, questions, or
          suggestions, feel free to reach out using the form below.
        </p>

        {submitted ? (
          <p className="text-lg sm:text-xl text-green-500 font-medium text-center">
            ✅ Thank you! We'll get back to you shortly.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            onKeyDown={onkeydown}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-sm sm:text-base"
              >
                Your Name
              </label>
              <input
                required
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={clsx(
                  "w-full px-4 py-2 text-sm sm:text-base rounded-md border focus:outline-orange-500",
                  isDark
                    ? "bg-gray-700 border-gray-300 text-gray-100"
                    : "bg-white border-gray-300 text-gray-800"
                )}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-sm sm:text-base"
              >
                Email Address
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={clsx(
                  "w-full px-4 py-2 text-sm sm:text-base rounded-md border focus:outline-orange-500",
                  isDark
                    ? "bg-gray-700 border-gray-300 text-gray-100"
                    : "bg-white border-gray-300 text-gray-800"
                )}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 font-medium text-sm sm:text-base"
              >
                Message
              </label>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={clsx(
                  "w-full px-4 py-2 text-sm sm:text-base rounded-md border focus:outline-orange-500 resize-none",
                  isDark
                    ? "bg-gray-700 border-gray-300 text-gray-100 placeholder:text-gray-400"
                    : "bg-white border-gray-300 text-gray-800 placeholder:text-gray-500"
                )}
                placeholder="Let us know your thoughts..."
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

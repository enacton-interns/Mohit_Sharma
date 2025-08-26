import { useSelector } from "react-redux";
import clsx from "clsx";

const AboutPage = () => {
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <div
      className={clsx(
        "min-h-screen px-4 sm:px-6 py-12 sm:py-20",
        isDark ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-gray-900"
      )}
    >
      <div className="max-w-4xl mx-auto px-2 sm:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
          About Us
        </h1>

        <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
          Welcome to <strong>Mental Wellness</strong>, your personal journaling
          companion. Our mission is to help you track your thoughts, emotions,
          and daily experiences in a simple and insightful way.
        </p>

        <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
          Whether you're feeling anxious, calm, or somewhere in between,
          journaling helps you reflect, grow, and gain clarity. Our mood-based
          journal system allows you to understand patterns in your emotional
          well-being and take control of your mental health.
        </p>

        <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
          This app was built with a focus on simplicity, privacy, and insight.
          We don’t store your data on servers — everything stays local on your
          device unless you choose to back it up.
        </p>

        <p className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
          Thank you for choosing MindScribe. Your thoughts matter. Your mood
          matters. You matter.
        </p>

        <div className="mt-8 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
            Our Vision
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            We envision a world where everyone has easy access to
            self-reflection tools, helping them lead more mindful, balanced, and
            emotionally intelligent lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

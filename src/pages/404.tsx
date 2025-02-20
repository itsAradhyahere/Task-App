import { Button } from "antd";
import { ErrorIllustration } from "../assets/error-illustration";
import { HiArrowLeft, HiOutlineSupport } from "react-icons/hi";
import { useNavigate } from "react-router";

export default function Global404() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <main className="flex flex-col h-dvh">
      <div className="max-w-8xl mx-auto lg:p-8 p-6 flex flex-col items-center justify-center text-center flex-1 mb-12">
        <ErrorIllustration width={180} height={180} />
        <h1 className="font-semibold sm:text-3xl text-2xl mb-3">
          404: Page Not Found
        </h1>
        <p className="max-w-sm sm:text-base text-sm opacity-80 mb-6">
          Sorry! The page you are looking for does not exist. Kindly go back by
          clicking the back button
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            size="large"
            onClick={goBack}
            type="primary"
            icon={<HiArrowLeft />}
          >
            Go Back
          </Button>
          <Button size="large" icon={<HiOutlineSupport />} href="/support">
            Contact Support
          </Button>
        </div>
      </div>
    </main>
  );
}

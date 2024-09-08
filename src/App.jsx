import { Suspense } from "react";
import Navbar from "./components/Navbar";
import Router from "./routes/route";
import Loader from "./components/ui/Loader";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Toaster/>
      <main className="max-w-6xl w-full self-center px-2 md:px-4 py-10 md:py-20">
        <Suspense
          fallback={
            <div className="min-h-[80vh] grid place-items-center w-full text-xl md:text-3xl">
              <Loader />
            </div>
          }
        >
          <Router />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;

import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Write your <span className="text-orange-500">resumes</span> in Markdown!
      </h1>
      <p className="text-gray-600 text-center max-w-xl mb-8">
        <span className="text-emerald-500">Hi</span> there! Welcome to our
        resume builder. Create professional resumes effortlessly using our
        Markdown editor. Get started now and land your dream job!
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-3 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors"
      >
        Create My Resume
      </Link>
    </main>
  );
}

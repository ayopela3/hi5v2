import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="font-bold text-blue-600 text-lg">HIFIVE</div>
                <div className="text-xs text-gray-600 -mt-1">COWORKING HUB</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Spaces
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Membership
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Events
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
              A PLACE
              <br />
              BEYOND
              <br />
              JUST
              <br />
              CONNECTING
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Reach higher, work better – that's what we're all about. Located
              in Iloilo City, HiFive isn't just a coworking space; it's a
              vibrant community designed to help you grow, connect and thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-base">
                Explore Membership Options
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="bg-white text-blue-600 border-blue-600 hover:bg-blue-50 px-8 py-3 text-base"
              >
                Schedule a Visit
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/coworking-space.png"
                alt="Modern coworking space interior with comfortable seating and industrial design"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

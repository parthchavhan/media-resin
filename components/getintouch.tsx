import dynamic from "next/dynamic";

// Dynamically import Lucide icons to prevent hydration mismatch
const MapPin = dynamic(() => import("lucide-react").then((mod) => mod.MapPin), { ssr: false });
const Phone = dynamic(() => import("lucide-react").then((mod) => mod.Phone), { ssr: false });
const Mail = dynamic(() => import("lucide-react").then((mod) => mod.Mail), { ssr: false });

export default function GetInTouch() {
  return (
    <div className="max-w-7xl mx-auto py-8 bg-white dark:bg-gray-950">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
             
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-primary mb-6">Contact Info</h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    HPV5+3X Udaipur, Rajasthan
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    094143 43709
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary p-3 rounded-full flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                  mediaengrave@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.899421106371!2d73.70997679999999!3d24.5926671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5773398547f%3A0x2c9badeb814e870b!2sMedia%20Engrave!5e0!3m2!1sen!2sin!4v1747906487304!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>

          {/* Map Overlay Info Card */}
          <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="bg-primary p-2 rounded">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">Media Engrave</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  HPV5+3X Udaipur, Rajasthan
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {"★".repeat(4)}★
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">8.4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Attribution */}
          <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-900 bg-opacity-90 px-2 py-1 rounded text-xs">
            <span className="text-gray-600 dark:text-gray-300">Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

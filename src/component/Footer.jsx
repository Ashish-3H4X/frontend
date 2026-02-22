import React from 'react';
import bgImagePath from '../assets/home.jpg'
const Footer = () => {
   
  return (
    //  <footer className="bg-gray-900 text-gray-200 py-12">
    //    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
    //      <div>
    //        <h3 className="text-xl font-bold mb-3">LearnHub</h3>
    //        <p className="text-sm text-gray-300">Bite-sized courses, clear paths, and real-project learning.</p>
    //        <div className="mt-4 flex gap-3">
    //          <a href="#" className="p-2 bg-gray-800 rounded"><i className="ri-twitter-fill"></i></a>
    //          <a href="#" className="p-2 bg-gray-800 rounded"><i className="ri-github-fill"></i></a>
    //          <a href="#" className="p-2 bg-gray-800 rounded"><i className="ri-linkedin-fill"></i></a>           </div>
    //      </div>

    //      <div>
    //        <h4 className="font-semibold mb-3">Products</h4>
    //        <ul className="space-y-2 text-sm text-gray-300">
    //          <li><a href="#" className="hover:text-white">Courses</a></li>
    //          <li><a href="#" className="hover:text-white">Live Classes</a></li>
    //          <li><a href="#" className="hover:text-white">Bootcamps</a></li>
    //        </ul>
    //      </div>
    //      <div>
    //        <h4 className="font-semibold mb-3">Company</h4>
    //        <ul className="space-y-2 text-sm text-gray-300">
    //         <li><a href="#" className="hover:text-white">About</a></li>
    //          <li><a href="#" className="hover:text-white">Careers</a></li>
    //          <li><a href="#" className="hover:text-white">Press</a></li>
    //        </ul>
    //      </div>
    //      <div>
    //       <h4 className="font-semibold mb-3">Support</h4>
    //        <ul className="space-y-2 text-sm text-gray-300">
    //         <li><a href="#" className="hover:text-white">Docs</a></li>
    //         <li><a href="#" className="hover:text-white">Community</a></li>
    //          <li><a href="#" className="hover:text-white">Contact</a></li>
    //       </ul>
    //     </div>
    //    </div>
    //   <div className="mt-8 border-t border-gray-800 pt-6">
    //     <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
    //       <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
    //       <div className="mt-3 md:mt-0 flex gap-4">
    //         <a href="#">Privacy</a>
    //         <a href="#">Terms</a>
    //         <a href="#">Status</a>
    //       </div>
    //     </div>
    //    </div>
    // </footer>

 <footer className="relative text-gray-200">
      {/* Decorative background (uses uploaded image). Replace path if needed. */}
      <div
        className="absolute inset-0 bg-[#252424] opacity-95"/>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Column 1 (logo + signup + social) */}
          <div>
             <h2 className="  text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
          VIRTUAL LEARNING 
        </h2>
            <p className="text-sm mb-4">Sign-up and get updates</p>

            <div className="flex items-center bg-transparent border border-gray-600 rounded-full overflow-hidden w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-transparent text-gray-100 placeholder-gray-300 outline-none"
              />
              <button className="px-4 py-2 bg-white text-black rounded-r-full">➤</button>
            </div>

            <p className="mt-6 mb-2 text-sm text-gray-300">Follow Us</p>
            <div className="flex gap-3 text-xl">
              <a className="p-2 bg-black/30 rounded-md border border-gray-700" href="#" aria-label="LinkedIn">
                <i className="ri-linkedin-box-fill"></i>
              </a>
              <a className="p-2 bg-black/30 rounded-md border border-gray-700" href="#" aria-label="YouTube">
                <i className="ri-youtube-fill"></i>
              </a>
              <a className="p-2 bg-black/30 rounded-md border border-gray-700" href="#" aria-label="Instagram">
                <i className="ri-instagram-fill"></i>
              </a>
              <a className="p-2 bg-black/30 rounded-md border border-gray-700" href="#" aria-label="Facebook">
                <i className="ri-facebook-fill"></i>
              </a>
              <a className="p-2 bg-black/30 rounded-md border border-gray-700" href="#" aria-label="TikTok">
                <i className="ri-tiktok-line"></i>
              </a>
            </div>
          </div>

          {/* Column groups (4 columns like screenshot) */}
          {[
            { title: 'Company', items: ['About Us', 'Careers', 'Platform Features', 'Contact Us', 'Suggest a Widget+'] },
            { title: 'Widgets+', items: ['Image Hotspot', 'Messenger Chat', 'Telegram Chat', 'WhatsApp Chat', 'Testimonials Slider'] },
            { title: 'Platforms', items: ['Shopify', 'WordPress', 'Squarespace', 'Wix', 'Webflow'] },
            { title: 'Resources', items: ['Blog', 'Developers', 'Write for Us', 'Special Offers', 'Holiday Templates'] },
          ].map((col, i) => (
            <div key={i}>
              <h3 className="text-white font-semibold mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-2 text-sm text-gray-300">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href="#" className="hover:text-white">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Virtual Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>


 
  );
}

export default Footer;





// function ResponsiveAnimatedFooter() {
//   const cols = [
//     { title: 'Products', items: ['Courses', 'Paths', 'Projects'] },
//     { title: 'Resources', items: ['Docs', 'Blog', 'Guides'] },
//     { title: 'Company', items: ['About', 'Careers', 'Contact'] },
//     { title: 'Community', items: ['Forum', 'Events', 'Affiliates'] },
//   ];

//   return (
   
//   );
// }

// /* ---------------- Demo wrapper (default export) ---------------- */
// export default function FootersDemo() {
//   const [view, setView] = useState('exact');
//   return (
//     <div className="space-y-8 bg-neutral-900 min-h-screen text-gray-100">
//       <div className="max-w-5xl mx-auto px-6 pt-12">
//         <h1 className="text-3xl font-bold mb-3">Footer component previews</h1>
//         <p className="text-sm text-gray-300 mb-6">Switch between the three prepared footer styles. Drop the component into any page.</p>

//         <div className="inline-flex rounded-md overflow-hidden border border-gray-700">
//           <button
//             onClick={() => setView('exact')}
//             className={`px-4 py-2 ${view === 'exact' ? 'bg-indigo-600 text-white' : 'bg-transparent text-gray-300'}`}
//           >Screenshot</button>
//           <button
//             onClick={() => setView('clean')}
//             className={`px-4 py-2 ${view === 'clean' ? 'bg-indigo-600 text-white' : 'bg-transparent text-gray-300'}`}
//           >Clean</button>
//           <button
//             onClick={() => setView('responsive')}
//             className={`px-4 py-2 ${view === 'responsive' ? 'bg-indigo-600 text-white' : 'bg-transparent text-gray-300'}`}
//           >Responsive</button>
//         </div>

//         <div className="mt-8">
//           {view === 'exact' && <ExactScreenshotFooter />}
//           {view === 'clean' && <CleanFooter />}
//           {view === 'responsive' && <ResponsiveAnimatedFooter />}
//         </div>

//         <p className="mt-6 text-sm text-gray-400">Notes: If your app doesn't serve files from <code className="bg-gray-800 px-1 rounded">/mnt/data/...</code>, replace <code className="bg-gray-800 px-1 rounded">bgImagePath</code> with the public URL of the screenshot image.</p>
//       </div>

//       {/* small spacer so footer examples show on dark bg */}
//       <div className="h-24" />
//     </div>
//   );
// }
